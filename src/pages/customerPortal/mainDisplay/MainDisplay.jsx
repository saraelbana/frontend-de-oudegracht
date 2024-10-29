import "./MainDisplay.css";
import ImageContainer from "../../../components/imageContainer/ImageContainer.jsx";
import React from "react";

function MainDisplay(){
    return(
        <div className="main-display">
            <section className="cover-image">
                <ImageContainer source="/src/assets/cover-image.jpg" alt="restaurant vibes"/>
            </section>
            <section className="signature-dish-section">
                <ImageContainer className="image-container" source="/src/assets/signature-dish-250x250.jpeg"
                                alt="signature dish"/>
                <ImageContainer className="image-container" source="/src/assets/signature-dish-250x250.jpeg"
                                alt="signature dish"/>
                <ImageContainer className="image-container" source="/src/assets/signature-dish-250x250.jpeg"
                                alt="signature dish"/>
            </section>
        </div>
    );
}
export default MainDisplay;