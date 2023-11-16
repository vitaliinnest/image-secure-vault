import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import { ImageMetadata, listImageMetadata } from "../services/web3storage";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const [imageMetadataList, setImageMetadataList] = useState<ImageMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const navigate = useNavigate();

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

  const handleCardClick = (cid: string) => {
    const clickedImageMetadata = imageMetadataList.find((metadata) => metadata.cid === cid);
    if (clickedImageMetadata) {
      navigate(`/photo/${cid}`, { state: { imageMetadata: clickedImageMetadata } });
    }
  };

  return (
    <Container style={{ marginTop: "30px", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Grid container spacing={3}>
        {!loading &&
          imageMetadataList.map((metadata, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                component={RouterLink}
                to={`/photo/${metadata.cid}`}
                state={{ imageMetadata: metadata }}
                onClick={() => handleCardClick(metadata.cid)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                  ":hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={metadata.caption}
                  height="140"
                  image={metadata.imageGatewayURL}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {metadata.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Gallery;
