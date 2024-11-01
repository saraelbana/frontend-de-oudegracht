import "./Button.css";
function Button(prop){
    return <button disabled={prop.disable}>{prop.buttonName}</button>
}
export default Button;