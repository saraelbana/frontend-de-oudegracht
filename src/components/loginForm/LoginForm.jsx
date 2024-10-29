import "./LoginForm.css";
import Button from "../button/Button.jsx";
import {Link} from "react-router-dom";

function LoginForm(){
    return(
        <form className="login-form">
            <label htmlFor="username-field" id="username-label">
                username:
                <input type='text' id="username-field"/>
            </label>
            <label htmlFor="password-field" id="password-label">
                Password:
                <input type='text' id="password-field"/>
            </label>
            <Button buttonName = "Log In"/>
            <p>
                <Link to="/forgot-password" className="forgot-password-link">
                    Forgot your password?
                </Link>

            </p>
        </form>
    )
}

export default LoginForm;