import React from "react";
import { ImageMetadata, convertIpfsUriToHttps } from "../services/web3storage";
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

type Props = {
  imageCaption: string;
  imagePath: string;
  imageMetadata?: ImageMetadata;
  imageMetadataTitle?: string;
  actionName: string;
  onActionClick: () => void;
  showLoader?: boolean;
  loaderTitle?: string;
};

function CustomPhotoMetadata(props: Props) {
  const { imagePath, imageCaption, imageMetadata, imageMetadataTitle } = props;

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: "70vh" }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {imageCaption}
            </Typography>
            <img src={imagePath} alt={imageCaption} style={{ maxWidth: "100%" }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {props.showLoader && !imageMetadata ? (
              <Box display="flex" alignItems="center" flexDirection="column">
                <CircularProgress />
                <Typography variant="body1" color="textSecondary">
                  {props.loaderTitle}
                </Typography>
              </Box>
            ) : (
          <>
            {imageMetadata && <>
              {imageMetadataTitle && <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>{imageMetadataTitle}</Typography>}
              <Typography>
                <Link href={convertIpfsUriToHttps(imageMetadata.imageURI)} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                  <FileCopyIcon /> Image URI
                </Link>: {imageMetadata.imageURI}<br />
                <Link href={convertIpfsUriToHttps(imageMetadata.metadataURI)} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                  <DescriptionIcon /> Metadata URI
                </Link>: {imageMetadata.metadataURI}<br />
                <Link href={imageMetadata.imageGatewayURL} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                  <ImageSearchIcon /> Image Gateway URL
                </Link>: {imageMetadata.imageGatewayURL}<br />
                <Link href={imageMetadata.metadataGatewayURL} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                  <DescriptionIcon /> Metadata Gateway URL
                </Link>: {imageMetadata.metadataGatewayURL}<br />
              </Typography>
              <Box mt={10}>
                <Button onClick={props.onActionClick} variant="contained" color="primary">
                  {props.actionName}
                </Button>
              </Box>
            </>}
          </>
        )}
        </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomPhotoMetadata;
