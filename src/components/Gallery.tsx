import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { ImageMetadata, listImageMetadata } from "../services/web3storage";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";

function Gallery() {
  const [imageMetadataList, setImageMetadataList] = useState<ImageMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  
  useEffect(() => {
    const fetchImageMetadata = async () => {
      try {
        const metadataGenerator = listImageMetadata(token!);
        const metadataList: ImageMetadata[] = [];
        for await (const metadata of metadataGenerator) {
          metadataList.push(metadata);
        }
        setImageMetadataList(metadataList);
      } catch (error) {
        console.error("Error fetching image metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageMetadata();
  }, [token]);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Grid container spacing={3} style={{ height: "70vh" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          imageMetadataList.map((metadata, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={metadata.caption}
                  height="140"
                  image={metadata.gatewayURL}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {metadata.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Gallery;
