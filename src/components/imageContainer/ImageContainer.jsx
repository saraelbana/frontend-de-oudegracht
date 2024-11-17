import "./ImageContainer.css";
import {useState} from "react";
import {ImageNotAvailable} from "../../constants/AssetsFilesNames.js";

;

function ImageContainer(prop){

    const [imgSrc, setImgSrc] = useState(prop.source);

    const handleError = () => {
        setImgSrc(ImageNotAvailable);
    };
    return (
        <div className="image-container">
            <img className="display-image" src={prop.source} alt={prop.alt} onError={handleError}  />
        </div>
    );
}
export default ImageContainer;