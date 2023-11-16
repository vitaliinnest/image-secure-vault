import React, { ChangeEvent } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import {
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storeImage } from "../services/web3storage";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import { useLocalStorage } from "usehooks-ts";

function UploadPhoto() {
  const [image, setImage] = React.useState<ImageType | undefined>();
  const [title, setTitle] = React.useState<string>("");
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);

  const onChange = (imageList: ImageListType) => {
    setImage(imageList[0]);
  };

  const onUploadToGallery = async () => {
    await storeImage(image!.file!, title, token!);
  };

  const onTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
            {!image && (
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
              </Stack>
            )}
            <Stack spacing={2} mt={2}>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100%" />
                  <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        onImageRemove(index);
                        setTitle('');
                      }}
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
      {image && (
        <>
          <TextField
            sx={{ mt: 5, width: "70%" }}
            label="Photo Title"
            variant="outlined"
            value={title}
            onChange={onTextChange}
          />
          <Button
            variant="contained"
            sx={{ mt: 5, width: "50%", height: "50px" }}
            onClick={onUploadToGallery}
          >
            <CloudUploadIcon sx={{ mr: 3 }} />
            Upload to Gallery
          </Button>
        </>
      )}
    </Container>
  );
}

export default UploadPhoto;
