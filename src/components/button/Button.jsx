import "./Button.css";
function Button(prop){
    return <button
        className={prop.size === "icon" ? "icon-button" : prop.buttonName === "Edit Profile" ? "edit-button" : "default-button"}
        onClick={prop.onClick}
        disabled={prop.disable}>
        {prop.text}
        {prop.iconSrc ? <img src={prop.iconSrc} alt={prop.buttonName} className="button-icon" /> : prop.buttonName}
    </button>
}
export default Button;