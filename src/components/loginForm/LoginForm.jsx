import "./LoginForm.css";
import Button from "../button/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {SHOW_PASSWORD_ICON, HIDE_PASSWORD_ICON} from "../../constants/AssetsFilesNames.js";
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password
            });

            console.log("Full login response:", response.data);

            // Assuming the token is in response.data.token
            const token = response.data.token;
            const userName = response.data.name || response.data.username || "Employee";
            
            if (token) {
                localStorage.setItem("authToken", token);
                // Store the name from the response
                localStorage.setItem("userName", userName);
                console.log("Token and name stored successfully:", {
                    token: token,
                    userName: userName
                });
            }
            setSuccess("Login successful");
            setError("");
            console.log("Successful login", response.data);
            navigate("/portal");
        } catch (error) {
            console.error("Full error response:", error.response);
            setError("Login failed: " + (error.response?.data || "Unknown error"));
            setSuccess("");
        }
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="login-form-container" style={{marginTop: "10%"}}>
            <form className="login-form" onSubmit={handleLogin}>
            <h2>Please sign in</h2>
                <label htmlFor="username-field"
                       id="username-label">
                    <input type='text'
                           id="username-field"
                           name="username"
                           placeholder="Username"
                           className="login-form-text-field"
                           onChange={(event) => setUsername(event.target.value)}
                    />
                    {/*onChange={( e : ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}*/}
                </label>
                <label htmlFor="password-field"
                       id="password-label">
                    <div className="password-container">
                        <input type={showPassword ? "text" : "password"}
                               id="password-field"
                               name="password"
                               placeholder="Password"
                               className="login-form-text-field"
                               onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button size="icon"
                            iconSrc={showPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                            onClick={toggleShowPassword}
                            type="button"
                        />
                    </div>
                </label>
                <p>
                    <Link to="/forgot-password" className="forgot-password-link">
                        Forgot your password?
                    </Link>
                </p>
                <br></br>
                <Button buttonName="Log In" disable={!(username && password)}/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <p className="or-divider">
                    of
                </p>
                <Button 
                    buttonName="Sign Up" 
                    onClick={() => window.location.href = "/signup"}
                    className="signup-button"
                />
                <p className="signup-text">
                    Become a special guest member
                </p>
            </form>
        </div>
    )
}

export default LoginForm;