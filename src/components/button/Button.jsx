import "./Button.css";
function Button(prop){
    const getClassName = () => {
        if (prop.size === "icon") return "icon-button";
        if (prop.buttonName === "Edit Profile") return "edit-button";
        if (prop.textWidth) return "text-width-button";
        return "default-button";
    };

    return <button
        className={getClassName()}
        onClick={prop.onClick}
        disabled={prop.disable}
        type={prop.type}>
        {prop.text}
        {prop.iconSrc ? <img src={prop.iconSrc} alt={prop.buttonName} className="button-icon" /> : prop.buttonName}
    </button>
}
export default Button;