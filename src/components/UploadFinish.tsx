import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../main";
import { ImageMetadata, storeImage } from "../services/web3storage";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import CustomPhotoMetadata from "./CustomPhotoMetadata";

function UploadFinish() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  console.log('UploadFinish location state', location.state)
  const { image, title } = location.state as LocationState;

  useEffect(() => {
    const storeImg = async () => {
      try {
        const storeResult = await storeImage(image, title, token!);
        setImageMetadata(storeResult);
      } catch (error) {
        console.error("Error storing image:", error);
      } finally {
        setLoading(false);
      }
    };

    storeImg();
  }, [image, title, token, setImageMetadata]);

  const handleGoToGallery = () => {
    navigate('/gallery');
  };

  return (
    <CustomPhotoMetadata
      imageCaption={title}
      imagePath={URL.createObjectURL(image)}
      imageMetadata={imageMetadata}
      actionName="Go to Gallery"
      onActionClick={handleGoToGallery}
      imageMetadataTitle="Your Image has been Stored"
      showLoader={loading}
      loaderTitle="Storing your image..."
    />
  );
}

export default UploadFinish;
