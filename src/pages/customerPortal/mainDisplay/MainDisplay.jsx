import "./MainDisplay.css";
import ImageContainer from "../../../components/imageContainer/ImageContainer.jsx";
import {CoverImage, SignatureDishOne, SignatureDishTwo, SignatureDishThree} from "../../../constants/AssetsFilesNames.js";


function MainDisplay(){
    return(
        <div className="main-display">
            <section className="cover-image">
                <ImageContainer source={CoverImage} alt="restaurant vibes"/>
            </section>
            <section className="signature-dish-section">
                <ImageContainer className="image-container" source={SignatureDishOne}
                                alt="signature dish"/>
                <ImageContainer className="image-container" source={SignatureDishTwo}
                                alt="signature dish"/>
                <ImageContainer className="image-container" source={SignatureDishThree}
                                alt="signature dish"/>
            </section>
        </div>
    );
}
export default MainDisplay;