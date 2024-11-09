import "./IconButton.css";

function IconButton(prop) {
    return (
        <button className="icon-button">
            <img src={prop.iconSrc} alt="icon" className="icon-image" onClick={prop.onClick}/>
            {/*<i className="icon">*/}
            {/*    {prop.icon}*/}
            {/*</i>*/}
        </button>
    );
}

export default IconButton;