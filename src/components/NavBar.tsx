import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Box from "@mui/material/Box";

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CameraAltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 3 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontSize: 25,
              mr: 20,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Image Secure Vault
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/upload-photo" style={{ textDecoration: "none" }}>
              <IconButton sx={{ my: 2, color: "white " }} title="Upload Photo">
                <CloudUploadIcon />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Upload Photo
                </Typography>
              </IconButton>
            </Link>

            <Link to="/gallery" style={{ textDecoration: "none" }}>
              <IconButton
                sx={{ my: 2, ml: 5, color: "white " }}
                title="Gallery"
              >
                <PhotoLibraryIcon />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Gallery
                </Typography>
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <IconButton
                  color="inherit"
                  sx={{ color: "white", marginLeft: "auto" }}
                  title="Settings"
                >
                  <SettingsIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
