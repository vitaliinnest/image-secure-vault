import React from "react";
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Button, Container, Typography, Paper, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function UploadPhoto() {
  const [image, setImage] = React.useState<ImageType | undefined>();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList[0]);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 20 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
        Upload Photo
      </Typography>

      <ImageUploading
        multiple
        value={image ? [image] : []}
        onChange={onChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            {!image && <Stack spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={onImageUpload}
                {...dragProps}
                sx={{ backgroundColor: isDragging ? "red" : undefined }}
              >
                <AddPhotoAlternateIcon sx={{ mr: 1 }} />
                Click or Drop here
              </Button>
            </Stack>}
            <Stack spacing={2} mt={2}>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100%" />
                  <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </div>
              ))}
            </Stack>
          </Paper>
        )}
      </ImageUploading>
    </Container>
  );
}

export default UploadPhoto;
