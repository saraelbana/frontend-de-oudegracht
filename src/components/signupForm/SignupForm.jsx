import "./SignupForm.css";
import {useState} from "react";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {deoudegrachtApi, registerEndpoint} from "../../deoudegrachtApi.js";
import {createRequestData} from "../../helpers/GuestsOperations.js";
import Button from "../button/Button.jsx";
import { SHOW_PASSWORD_ICON, HIDE_PASSWORD_ICON } from "../../constants/AssetsFilesNames.js";

function SignupForm(){

        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [email, setEmail] = useState("");
        const [success, setSuccess] = useState("");
        const [error, setError] = useState("");
        const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); //needs investigation if it is necessary or not
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const requestData = createRequestData({firstname, lastname, email, username, password});
        try {
            const response = await deoudegrachtApi.post(registerEndpoint, requestData);
            setSuccess(`Guest created successfully! ID: ${response.data.id}`);
            setError("");
        }
        catch (e) {
            setError("Error creating new employee " + e.response.data);
            setSuccess("");
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(
        <div className="login-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create an Account</h2>
                <div className="signup-name">
                    <label htmlFor="firstname-field" id="firstname-label">
                        <input 
                            type='text'
                            id="firstname-field"
                            name="firstname"
                            required
                            placeholder="Firstname"
                            className="signup-form-text-field"
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </label>
                    <label htmlFor="lastname-field" id="lastname-label">
                        <input 
                            type='text'
                            id="lastname-field"
                            name="lastname"
                            required
                            placeholder="Lastname"
                            className="signup-form-text-field"
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </label>
                </div>
                <label htmlFor="email-field" id="email-label">
                    <input 
                        type='email'
                        id="email-field"
                        name="email"
                        required
                        placeholder="Email"
                        className="signup-form-text-field"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="username-field" id="username-label">
                    <input 
                        type='text'
                        id="username-field"
                        name="username"
                        required
                        placeholder="Username"
                        className="signup-form-text-field"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password-field" id="password-label">
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password-field"
                            name="password"
                            required
                            placeholder="Password"
                            className="signup-form-text-field"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button 
                            size="icon"
                            iconSrc={showPassword ? HIDE_PASSWORD_ICON : SHOW_PASSWORD_ICON}
                            onClick={toggleShowPassword}
                            type="button"
                        />
                    </div>
                </label>
                <label htmlFor="confirm-password-field" id="confirm-password-label">
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="confirm-password-field"
                            name="confirm-password"
                            required
                            placeholder="Confirm Password"
                            className="signup-form-text-field"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </label>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <br></br><br></br>
                <Button 
                    buttonName="Submit" 
                    type="submit" 
                    disable={!(firstname && lastname && email && username && password && confirmPassword)}
                />
                <p className="or-divider">of</p>
                <Button 
                    buttonName="Log In" 
                    onClick={() => window.location.href = "/login"}
                />
                <p className="signup-text">Already have an account?</p>
            </form>
        </div>
    );
}

export default SignupForm