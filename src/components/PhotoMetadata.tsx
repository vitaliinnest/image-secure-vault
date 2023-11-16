import { useLocation, useNavigate } from "react-router-dom";
import CustomPhotoMetadata from "./CustomPhotoMetadata";
import { ImageMetadata } from "../services/web3storage";

function PhotoMetadata() {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageMetadata } = location.state as { imageMetadata: ImageMetadata };
  
  return (
    <CustomPhotoMetadata
      imageCaption={imageMetadata.caption}
      imagePath={imageMetadata.imageGatewayURL}
      imageMetadata={imageMetadata}
      actionName="Back to Gallery"
      onActionClick={() => navigate('/gallery')}
    />
  );
}

export default PhotoMetadata;
