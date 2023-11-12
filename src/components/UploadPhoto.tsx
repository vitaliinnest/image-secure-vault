import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  Button,
  Container,
  Typography,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function UploadPhoto() {
  const [images, setImages] = React.useState<ImageListType>([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
        Upload Photo
      </Typography>

      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Stack spacing={2}>
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
              <IconButton color="secondary" onClick={onImageRemoveAll}>
                <DeleteIcon />
              </IconButton>
            </Stack>

            <Stack spacing={2} mt={2}>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Button
                      variant="outlined"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
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
