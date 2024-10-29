import "./LoginForm.css";
import Button from "../button/Button.jsx";
import {Link} from "react-router-dom";

function LoginForm(){
    return(
        <form className="login-form">
            <label htmlFor="username-field" id="username-label">
                username:
                <input type='text' id="username-field"  name="username" placeholder = "Username"  onChange={(e) => console.log(e.target.value)}/>
                {/*onChange={( e : ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}*/}
            </label>
            <label htmlFor="password-field" id="password-label">
                Password:
                <input type='password' id="password-field" name="password" placeholder = "Password"  onChange={(e) => console.log(e.target.value)}/>
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