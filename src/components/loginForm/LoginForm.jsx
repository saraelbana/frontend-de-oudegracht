import "./LoginForm.css";
import Button from "../button/Button.jsx";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { SHOW_PASSWORD_ICON, HIDE_PASSWORD_ICON } from "../../constants/AssetsFilesNames.js";
import { useNavigate } from "react-router-dom";
import { authRequestData } from "../../helpers/LoginOperations.js";
import { loginEndpoint } from "../../deoudegrachtApi.js";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";


function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {loginHandler} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const requestData = authRequestData({ username, password });
            const response = await axios.post(loginEndpoint, requestData);

            const token = response.data.token;
            const user_username = response.data.name || response.data.username || "Employee";
            const user_role = response.data.userRole;
            const user_firstname = response.data.firstname;

            if (token) {
                localStorage.setItem("authToken", token);
                localStorage.setItem("user_username", user_username);
                localStorage.setItem("user_role", user_role);
                localStorage.setItem("user_firstname", user_firstname);

                loginHandler({
                    username: user_username,
                    role: user_role,
                    firstname: user_firstname
                });
            }
            setSuccess("Login successful");
            setError("");

            if(user_role === "GUEST")
                navigate(`/guest-profile/${user_username}`);
                else
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

    return (
        <div className="login-form-container margin-top-10">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Please sign in</h2>
                <label htmlFor="username-field" id="username-label">
                    <input
                        type="text"
                        id="username-field"
                        name="username"
                        placeholder="Username"
                        className="login-form-text-field"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label htmlFor="password-field" id="password-label">
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password-field"
                            name="password"
                            placeholder="Password"
                            className="login-form-text-field"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            size="icon"
                            iconSrc={showPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                            onClick={toggleShowPassword}
                            type="button"
                        />
                    </div>
                </label>
                <p className="forget-password-link">
                    <Link to="/forgot-password" className="forgot-password-link">
                        Forgot your password?
                    </Link>
                </p>
                <br />
                <Button buttonName="Log In" disable={!(username && password)} />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <p className="or-divider">or</p>
                <Button
                    buttonName="Sign Up"
                    onClick={() => window.location.href = "/signup"}
                    className="signup-button"
                />
                <p className="signup-text">Become a special guest member</p>
            </form>
        </div>
    );
}

export default LoginForm;