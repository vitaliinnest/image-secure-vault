import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../main";
import { StoreImageResult, convertIpfsUriToHttps, storeImage } from "../services/web3storage";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

function UploadFinish() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const [storeImageResult, setStoreImageResult] = useState<StoreImageResult | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const { image, title } = location.state as LocationState;

  useEffect(() => {
    const storeImg = async () => {
      try {
        const storeResult = await storeImage(image, title, token!);
        setStoreImageResult(storeResult);
      } catch (error) {
        console.error("Error storing image:", error);
      } finally {
        setLoading(false);
      }
    };

    storeImg();
  }, [image, title, token, setStoreImageResult]);

  const handleGoToGallery = () => {
    navigate('/gallery');
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: "70vh" }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <img src={URL.createObjectURL(image)} alt={title} style={{ maxWidth: "100%" }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {loading && !storeImageResult ? (
              <Box display="flex" alignItems="center" flexDirection="column">
                <CircularProgress />
                <Typography variant="body1" color="textSecondary">
                  Storing your image...
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
                  Your Image has been Stored
                </Typography>
                <Typography>
                  <Link href={convertIpfsUriToHttps(storeImageResult!.imageURI)} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                    <FileCopyIcon /> Image URI
                  </Link>: {storeImageResult?.imageURI}<br />
                  <Link href={convertIpfsUriToHttps(storeImageResult!.metadataURI)} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                    <DescriptionIcon /> Metadata URI
                  </Link>: {storeImageResult?.metadataURI}<br />
                  <Link href={storeImageResult?.imageGatewayURL} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                    <ImageSearchIcon /> Image Gateway URL
                  </Link>: {storeImageResult?.imageGatewayURL}<br />
                  <Link href={storeImageResult?.metadataGatewayURL} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                    <DescriptionIcon /> Metadata Gateway URL
                  </Link>: {storeImageResult?.metadataGatewayURL}<br />
                </Typography>
                <Box mt={10}>
                  <Button onClick={handleGoToGallery} variant="contained" color="primary">
                    Go to Gallery
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UploadFinish;
