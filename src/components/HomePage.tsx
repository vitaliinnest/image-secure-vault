import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";

// todo: add web3.storage <a> link
const HomePage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          height: "80vh", // Set the height to full viewport height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Center the content vertically
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Image Secure Vault
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Store your images securely on the blockchain. Our AI ensures that
          uploaded images are safe and non-harmful.
        </Typography>

        <Link to="/upload-photo" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
          >
            Upload Photo
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
