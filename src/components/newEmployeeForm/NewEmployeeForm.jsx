import "./NewEmployeeForm.css";
import axios from "axios";
import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";

function NewEmployeeForm(){

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("https://localhost:5432/roles");
                setRoles(response.data);
            } catch (e) {
                console.log("Error fetching roles", e);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); //needs investigation if it is necessary or not
        //what typical logic is it behind ?
        //what is the purpose of this function ?
        try {
            const response = await axios.post("https://localhost:5432/employees", {firstname, lastname, email, phoneNumber, username, password});
            console.log("Employee created successfully!", response.data);
            setSuccess(`Employee created successfully! ID: ${response.data.id}`);
            setError("");
        }
        catch (e) {
            console.log("Error creating new employee",e.data);
            setError("Error creating new Employee", e.data);
            setSuccess("");
        }
    }
    return(
            <form className="new-employee-form" onSubmit={handleSubmit}>
                <div className="new-employee-name">
                    <label id = "firstname-label">
                        firstname:
                        <input type='text'
                               id="firstname-field"
                               name="firstname"
                               placeholder="Firstname"
                               required
                               onChange={(event) => setFirstname(event.target.value)}
                               />
                    </label>
                    <label id = "lastname-label">
                        lastname:
                        <input type='text'
                               id="lastname-field"
                               name="lastname"
                               placeholder="Lastname"
                               required
                               onChange={(event) => setLastname(event.target.value)}
                               />
                    </label>
                </div>
                <div className="new-employee-contact">
                    <label id = "email-label">
                        email:
                        <input type='email'
                               id="email-field"
                               name="email"
                               placeholder="Email"
                               onChange={(event) => setEmail(event.target.value)}
                               />
                    </label>
                    <label id = "phone-number-label">
                        Mobile Number:
                        <input type='tel'
                               id="phone-number-field"
                               name="phone-number"
                               placeholder="Mobile Number"
                               onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                    </label>
                </div>
                <label id = "username-label">
                    username:
                    <input type='text'
                           id="username-field"
                           name="username"
                           placeholder="Username"
                           required
                           onChange={(event) => setUsername(event.target.value)}
                           />
                </label>
                <label id = "password-label">
                    password:
                    <input type='password'
                           id="password-field"
                           name="password"
                           placeholder="Password"
                           required
                           onChange={(event) => setPassword(event.target.value)}
                           />
                </label>
                <label id = "role-label">
                    role:
                    <select id="role-field" name="role" onChange={(event) => setRole(event.target.value)}>
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
               <Button buttonName = "Submit" disable={!(firstname && lastname && username && password && role)}/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

            </form>
    );
}

export default NewEmployeeForm;