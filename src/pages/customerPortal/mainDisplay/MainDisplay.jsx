import "./MainDisplay.css";
import ImageContainer from "../../../components/imageContainer/ImageContainer.jsx";
import {CoverImage, SignatureDish} from "../../../constants/AssetsFilesNames.js";


function MainDisplay(){
    return(
        <div className="main-display">
            <section className="cover-image">
                <ImageContainer source={CoverImage} alt="restaurant vibes"/>
            </section>
            <section className="signature-dish-section">
                <ImageContainer className="image-container" source={SignatureDish}
                                alt="signature dish"/>
                <ImageContainer className="image-container" source={SignatureDish}
                                alt="signature dish"/>
                <ImageContainer className="image-container" source={SignatureDish}
                                alt="signature dish"/>
            </section>
        </div>
    );
}
export default MainDisplay;