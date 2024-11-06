import "./LoginForm.css";
import Button from "../button/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5432/login", {username, password});
            console.log("Successful login",response.data);
        } catch (e) {
            console.log("Error logging in",e.data);
            setError("Login error",e.data);
        }
    };

    return(
        <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username-field"
                   id="username-label">
                username:
                <input type='text'
                       id="username-field"
                       name="username"
                       placeholder = "Username"
                       onChange={(event) => setUsername(event.target.value)}
                />
                {/*onChange={( e : ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}*/}
            </label>
            <label htmlFor="password-field"
                   id="password-label">
                Password:
                <input type='password'
                       id="password-field"
                       name="password"
                       placeholder = "Password"
                       onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <Button buttonName = "Log In" disable={!(username && password)}/>
            {error && <p className="error-message">{error}</p>}
            <p>
                <Link to="/forgot-password" className="forgot-password-link">
                    Forgot your password?
                </Link>

            </p>
        </form>
    )
}

export default LoginForm;