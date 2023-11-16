import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../main";
import { isImageSafe } from "../services/contentValidationService";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { AnalysisItem, ImageAnalysisResult } from "../models/imageAnalysisModels";
import { Box, Typography, Button } from "@mui/material";

function ValidatePhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title } = location.state as LocationState;
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString().split(',')[1];
        validateImage(base64String);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
    };

    reader.readAsDataURL(image);
  }, [image]);

  const validateImage = async (base64String: string) => {
    try {
      setLoading(true);
      const result = await isImageSafe(base64String);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error validating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/upload-photo");
  };

  const handleContinueClick = () => {
    navigate("/upload-finish");
  };

  const renderAnalysisResult = () => {
    if (!analysisResult) {
      return null;
    }

    const hasInappropriateItems = analysisResult.categoriesResult.some(
      (item: AnalysisItem) => item.severity > 0
    );

    return (
      <div>
        <Typography style={{ fontWeight: "bold" }} variant="h6">AI Analysis Result</Typography>
        <Box display="flex" alignItems="center">
          {hasInappropriateItems ? (
            <WarningIcon style={{ color: "red", marginRight: 5 }} />
          ) : (
            <CheckCircleIcon style={{ color: "green", marginRight: 5 }} />
          )}
          <Typography variant="body1">
            {hasInappropriateItems
              ? "Image is not appropriate"
              : "Image is OK"}
          </Typography>
        </Box>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {analysisResult.categoriesResult.map((item: AnalysisItem, index: number) => (
            <li key={index}>
              <Box display="flex" alignItems="center">
                {item.severity === 0 ? (
                  <CheckCircleIcon style={{ color: "green", marginRight: 5 }} />
                ) : (
                  <WarningIcon style={{ color: "red", marginRight: 5 }} />
                )}
                <Typography>
                  <b>{item.category}</b>: {item.severity}/5
                </Typography>
              </Box>
            </li>
          ))}
        </ul>
        <Box mt={2}>
          <Button onClick={handleBackClick} variant="contained" color="primary" sx={{ mr: 5 }}>
            Back
          </Button>
          <Button onClick={handleContinueClick} variant="contained" color="primary" disabled={hasInappropriateItems}>
            Continue
          </Button>
        </Box>
      </div>
    );
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: "70vh" }}>
        <Grid item>
          <h1>{title}</h1>
          <img src={URL.createObjectURL(image)} alt={title} />
        </Grid>
        <Grid item>
          {loading ? <CircularProgress /> : renderAnalysisResult()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ValidatePhoto;
