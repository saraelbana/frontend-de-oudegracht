import "./EmployeeDetailsForm.css";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Button from "../button/Button.jsx";
import {
    getEmployeeResponseData,
    getRolesList
} from "../../helpers/APIOperations.js";
import {deoudegrachtApi, employeesEndpoint} from "../../deoudegrachtApi.js";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";

function EmployeeDetailsForm() {
    const {username} = useParams();
    const [searchParams] = useSearchParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const [rolesList, setRolesList] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {user}= useContext(AuthContext);

    useEffect(() => {
        const editable = searchParams.get('edit') === 'true';
        if (editable) {
            setIsEditMode(true);
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchEmployeeData = async () => {
            if(user.role === "ADMIN" || user.role === "CHEF" || user.username === username) {
                const response = await getEmployeeResponseData(username);
                if (response[0] === 1) {
                    setEmployeeData(response[1]);
                } else {
                    console.error("Error fetching employee data", response[1]);
                }
            }
            else
            { navigate("/notfound")
            }
        };
        fetchEmployeeData();
    }, [username]);
    useEffect(() => {
        const fetchRolesList = async () => {
            const rolesListResponse = await getRolesList();
            if (rolesListResponse[0] === 0) {
                console.error("Error fetching roles", rolesListResponse[1]);
            } else
                setRolesList(rolesListResponse[1]);
        };
        fetchRolesList();
    }, []);

    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };
    const handleSaveClick = async () => {

        const updatedFirstname = firstname || employeeData.firstname;
        const updatedLastname = lastname || employeeData.lastname;
        const updatedEmail = email || employeeData.email;
        const updatedPhone = phone || employeeData.phone;
        const updatedRole = role || employeeData.role;

        const toUpdateEmployeeData = {
            firstname: updatedFirstname,
            lastname: updatedLastname,
            email: updatedEmail,
            username: username,
            phone: updatedPhone,
            role: updatedRole

        }

        try {

            const updatedResponseData = await deoudegrachtApi.put(`${employeesEndpoint}/${username}`, toUpdateEmployeeData);
            setIsEditMode(false);
            setSuccess(`employee data edited successfully! ID: ${updatedResponseData.data.id}`);
            setError("");
            navigate("/portal/employee");
        }
        catch (error) {
            setError("Error editing employee data " + error);
            setSuccess("");
        }
    };

    if (!employeeData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="main-employee-details-form">

            <form className="display-employee">
                <div className="new-employee-name">
                    <div className="new-employee-firstname">
                        <label className="employee-label" id="firstname-label">
                            Firstname:
                            {
                            isEditMode ?
                                <>
                                    <input
                                        type="text"
                                        defaultValue={employeeData.firstname}
                                        onChange={(event) => setFirstname(event.target.value)}
                                    />
                                    <MandatoryTag restrictionMessage="No space"/>
                                </> : employeeData.firstname
                            }
                        </label>
                    </div>
                    <div className="new-employee-lastname">
                        <label className="employee-label" id="lastname-label">
                            Lastname: {isEditMode ?
                            <>
                                <input type="text" defaultValue={employeeData.lastname} onChange={(event) => setLastname(event.target.value)}/>
                                <MandatoryTag restrictionMessage="No space"/>
                            </>
                            : employeeData.lastname}
                        </label>
                    </div>
                </div>
                <div className="new-employee-contact">
                    <label className="employee-label" id="email-label">
                        Email: {
                        isEditMode ?
                        <input type="email" defaultValue={employeeData.email} onChange={(event) => setEmail(event.target.value)} /> : employeeData.email}
                    </label>
                    <label className="employee-label" id="phone-number-label">
                        Phone Number: {isEditMode ?
                        <input type="text" defaultValue={employeeData.phone} onChange={(event) => setPhone(event.target.value)}/> : employeeData.phone}
                    </label>
                </div>
                <div className="new-employee-credentials">
                    <div className="new-employee-username">
                        <label className="employee-label" id="username-label">
                            Username: {isEditMode ? (
                                <div>
                                    {employeeData.username}
                                    <span className="edit-restriction-message"> *can not edit</span>
                                </div>
                            )
                            : employeeData.username}
                        </label>
                    </div>
                    <div className="new-employee-password">
                        <label className="employee-label" id="password-label">
                            Password: {isEditMode ?
                            <div>
                                {"*****"}
                                <span className="edit-restriction-message"> *can not edit</span>
                                {/*I should add here a call to a new component that edits the user password given their id or username*/}
                            </div> : "*****"
                        }
                        </label>
                    </div>
                </div>
                <div className="new-employee-role">
                    <label className="employee-label" id="role-label">
                        Role: {isEditMode ? (
                        <select defaultValue={employeeData.role} onChange={(event) => setRole(event.target.value)}>
                            <option disabled selected>select role</option>
                            {
                                rolesList.map((role) => (
                                    <option key={role} value={role}> {role} </option>
                                ))
                            }
                        </select>
                    ) : employeeData.role}
                    </label>
                </div>
            </form>
            { (user.role === "ADMIN" || user.username === username) &&
                <Button buttonName={isEditMode ? "Save" : "Edit"}
                        onClick={isEditMode ? handleSaveClick : handleEditClick}/>
            }
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );

}

export default EmployeeDetailsForm;