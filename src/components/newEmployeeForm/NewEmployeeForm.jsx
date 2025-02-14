import "./NewEmployeeForm.css";
import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {deoudegrachtApi, employeesEndpoint, rolesEndpoint} from "../../deoudegrachtApi.js";
import {createRequestData} from "../../helpers/EmployeesOperations.js";
import {Default_Employee_Role} from "../../constants/EmployeesConstants.js";
import {useNavigate} from "react-router-dom";
import {HIDE_PASSWORD_ICON, SHOW_PASSWORD_ICON} from "../../constants/AssetsFilesNames.js";

function NewEmployeeForm(){

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(Default_Employee_Role);
    const [roles, setRoles] = useState([]);
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await deoudegrachtApi.get(rolesEndpoint);
                setRoles(response.data.allRoles);
            } catch (e) {

            }
        };
        getRoles();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {

            setError("Passwords do not match");
            return;
        }
        else if(password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        const requestData = createRequestData({firstname, lastname, email, username, password, phone, role});

        try {
            const response = await deoudegrachtApi.post(employeesEndpoint, requestData);
            setSuccess(`Employee created successfully! ID: ${response.data.id}`);
            setError("");
            navigate("/portal/employee");
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
            <form className="login-form new-employee-form" onSubmit={handleSubmit}>
                <div className="new-employee-name">
                    <div className="new-employee-firstname">
                        <label htmlFor="firstname-field">Firstname</label>
                        <MandatoryTag />
                        <input 
                            type='text'
                            id="firstname-field"
                            name="firstname"
                            placeholder="Firstname*"
                            required
                            className="login-form-text-field"
                            onChange={(event) => setFirstname(event.target.value)}
                        />
                    </div>
                    <div className="new-employee-lastname">
                        <label htmlFor="lastname-field">Lastname</label>
                        <MandatoryTag />
                        <input 
                            type='text'
                            id="lastname-field"
                            name="lastname*"
                            placeholder="Lastname"
                            required
                            className="login-form-text-field"
                            onChange={(event) => setLastname(event.target.value)}
                        />
                    </div>
                </div>
                <div className="new-employee-contact">
                    <label htmlFor="email-field">Email</label>
                    <input 
                        type='email'
                        id="email-field"
                        name="email"
                        placeholder="email@email.com"
                        className="login-form-text-field"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="phone-number-field">Mobile Number</label>
                    <input 
                        type='tel'
                        id="phone-number-field"
                        name="phone-number"
                        placeholder="Mobile Number"
                        className="login-form-text-field"
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div className="new-employee-credentials">
                    <label htmlFor="username-field">Username</label>
                    <MandatoryTag />
                    <input 
                        type='text'
                        id="username-field"
                        name="username"
                        placeholder="Username*"
                        required
                        className="login-form-text-field"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className="password-container">
                        <label htmlFor="password-field">Password</label>
                        <MandatoryTag restrictionMessage ="Min 8 characters"/>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password-field"
                            name="password"
                            placeholder="Password*"
                            required
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
                    <div className="password-container">
                        <label htmlFor="confirm-password-field">Confirm Password</label>
                        <MandatoryTag />
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="confirm-password-field"
                            name="confirm-password"
                            placeholder="Confirm Password*"
                            required
                            className="login-form-text-field"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>

                </div>
                <div className="new-employee-role">
                    <label htmlFor="role-field">Role</label>
                    <select
                        id="role-field"
                        name="role"
                        className="login-form-text-field"
                        onChange={(event) => setRole(event.target.value)}
                    >
                        <option value="" disabled selected >select role</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <Button
                    buttonName="Submit" 
                    className="submit-button"
                    disable={!(firstname && lastname && username && password &&confirmPassword)}
                />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default NewEmployeeForm;