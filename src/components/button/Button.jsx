import "./Button.css";
function Button(prop){
    return <button
        className={prop.buttonName === "Edit Profile" ? "edit-employee-button" : "default-button"}
        onClick={prop.onClick}
        disabled={prop.disable}>{prop.buttonName}
</button>
}
export default Button;