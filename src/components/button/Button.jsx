import "./Button.css";
function Button(prop){
    return <button
        className={prop.buttonName === "Edit Profile" ? "edit-employee-button" : "default-button"}
        disabled={prop.disable}>{prop.buttonName}
</button>
}
export default Button;