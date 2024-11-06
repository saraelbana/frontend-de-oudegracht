import "./NewEmployeeForm.css";
import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {deoudegrachtApi, employeeEndpoint, rolesEndpoint} from "../../deoudegrachtApi.js";
import {createRequestData} from "../../helpers/CreateNewEmployeeRequest.js";

function NewEmployeeForm(){

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await deoudegrachtApi.get(rolesEndpoint);
                setRoles(response.data.allRoles);
            } catch (e) {
                console.log("Error fetching roles", e.data);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); //needs investigation if it is necessary or not
        const requestData = createRequestData({firstname, lastname, email, username, password, phone, role});

        try {
            const response = await deoudegrachtApi.post(employeeEndpoint, requestData);
            setSuccess(`Employee created successfully! ID: ${response.data.id}`);
            setError("");
        }
        catch (e) {
            setError("Error creating new employee " + e.response.data);
            setSuccess("");
        }
    }

    return(
        <form className="new-employee-form" onSubmit={handleSubmit}>
            <div className="new-employee-name">
                <div className="new-employee-firstname">
                    <label id="firstname-label">
                    firstname:
                    <input type='text'
                           id="firstname-field"
                           name="firstname"
                           placeholder="Firstname"
                           required
                           onChange={(event) => setFirstname(event.target.value)}
                    />
                </label>
                    <MandatoryTag/>
                </div>
                <div className="new-employee-lastname">
                    <label id="lastname-label">
                    lastname:
                    <input type='text'
                           id="lastname-field"
                           name="lastname"
                           placeholder="Lastname"
                           required
                           onChange={(event) => setLastname(event.target.value)}
                    />
                </label>
                    <MandatoryTag/>
                </div>
            </div>
            <div className="new-employee-contact">
                <label id="email-label">
                    email:
                    <input type='email'
                           id="email-field"
                           name="email"
                           placeholder="Email"
                           onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label id="phone-number-label">
                    Mobile Number:
                    <input type='tel'
                           id="phone-number-field"
                           name="phone-number"
                           placeholder="Mobile Number"
                           onChange={(event) => setPhone(event.target.value)}
                    />
                </label>
            </div>
            <div className="new-employee-credentials">
                <div className="new-employee-username">
                    <label id="username-label">
                    username:
                    <input type='text'
                           id="username-field"
                           name="username"
                           placeholder="Username"
                           required
                           onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                    <MandatoryTag/>
                </div>
                <div className="new-employee-password">
                    <label id="password-label">
                        password:
                        <input type='password'
                           id="password-field"
                           name="password"
                           placeholder="Password"
                           required
                           onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                    <MandatoryTag/>
                </div>

            </div>
            <div className="new-employee-role">
                <label id="role-label">
                    role:
                    <select id="role-field" name="role" onChange={(event) => setRole(event.target.value)}>
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
            </div>
            <Button buttonName="Submit" disable={!(firstname && lastname && username && password && role)}/>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </form>
);
}

export default NewEmployeeForm;