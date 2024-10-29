import "./ImageContainer.css";

function ImageContainer(prop){
    return (
        <div className="image-container">
            <img className="display-image" src={prop.source} alt={prop.alt} />
        </div>
    );
}
export default ImageContainer;