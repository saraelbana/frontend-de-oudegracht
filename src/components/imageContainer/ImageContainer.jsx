import "./ImageContainer.css";
import {useState} from "react";
import {ImageNotAvailable} from "../../constants/AssetsFilesNames.js";


function ImageContainer(prop){

    const [imgSrc, setImgSrc] = useState(prop.source);

    const handleImgError = () => {
        setImgSrc(ImageNotAvailable);
    };
    return (
        <div className="image-container">
            <img className="display-image" src={imgSrc} alt={prop.alt} onError={handleImgError}/>
        </div>
    );
}
export default ImageContainer;