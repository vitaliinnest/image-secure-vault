import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LocationState } from "../main";
import { isImageSafe, ImageAnalysisResult } from "../services/contentValidationService";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { AnalysisItem } from "../models/imageAnalysisModels";

function ValidatePhoto() {
  const location = useLocation();
  const { image, title } = location.state as LocationState;
  const [base64StringImage, setBase64StringImage] = useState<string | undefined>();
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString().split(',')[1];
        setBase64StringImage(base64String);
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

  const renderAnalysisResult = () => {
    if (!analysisResult) {
      return null;
    }

    const hasInappropriateItems = analysisResult.categoriesResult.some(
      (item: AnalysisItem) => item.severity > 0
    );

    return (
      <div>
        <h2>AI Analysis Result</h2>
        <p>
          {hasInappropriateItems ? (
            <>
              <WarningIcon style={{ color: "red", marginRight: 5 }} />
              Image is not appropriate
            </>
          ) : (
            <>
              <CheckCircleIcon style={{ color: "green", marginRight: 5 }} />
              Image is OK
            </>
          )}
        </p>
        <ul>
          {analysisResult.categoriesResult.map((item: AnalysisItem, index: number) => (
            <li key={index}>
              {item.severity === 0 ? (
                <CheckCircleIcon style={{ color: "green", marginRight: 5 }} />
              ) : (
                <WarningIcon style={{ color: "red", marginRight: 5 }} />
              )}
              <b>{item.category}</b>: {item.severity}/5
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: "87vh" }}>
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
