import "./EmployeeDetailsForm.css";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../button/Button.jsx";
import {
    getEmployeeResponseData,
    getRolesList,
    updateEmployeeData
} from "../../helpers/APIOperations.js";

function EmployeeDetailsForm() {
    const {username} = useParams();
    const [searchParams] = useSearchParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [rolesList, setRolesList] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/portal/employee");
    }
    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };
    const handleSaveClick = async () => {
        console.log("Saving employee data:", employeeData);
        const updateEmployeeResponse = await updateEmployeeData(username, employeeData);
        console.log("Update response:", updateEmployeeResponse);
        if (updateEmployeeResponse[0] === 1) {
            setIsEditMode(false);
        } else {
            console.error("Error updating employee data", updateEmployeeResponse[1]);
        }
    };
    useEffect(() => {
        const editable = searchParams.get('edit') === 'true';
        if (editable) {
            setIsEditMode(true);
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchEmployeeData = async () => {
            const response = await getEmployeeResponseData(username);

            if (response[0] === 1) {
                setEmployeeData(response[1]);
            } else {
                console.error("Error fetching employee data", response[1]);
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


    if (!employeeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-employee-details-form">
            <section className="Employee-details-header">
                <Button buttonName="← Back" onClick={handleBackClick}/>
                <h2>{employeeData.role} {employeeData.firstname} profile</h2>
            </section>
            <form className="display-employee">
                <div className="new-employee-name">
                    <div className="new-employee-firstname">
                        <label id="firstname-label">
                            Firstname: {isEditMode ?
                            <input type="text" defaultValue={employeeData.firstname}/> : employeeData.firstname}
                        </label>
                    </div>
                    <div className="new-employee-lastname">
                        <label id="lastname-label">
                            Lastname: {isEditMode ?
                            <input type="text" defaultValue={employeeData.lastname}/> : employeeData.lastname}
                        </label>
                    </div>
                </div>
                <div className="new-employee-contact">
                    <label id="email-label">
                        Email: {isEditMode ?
                        <input type="email" defaultValue={employeeData.email}/> : employeeData.email}
                    </label>
                    <label id="phone-number-label">
                        Phone Number: {isEditMode ?
                        <input type="text" defaultValue={employeeData.phone}/> : employeeData.phone}
                    </label>
                </div>
                <div className="new-employee-credentials">
                    <div className="new-employee-username">
                        <label id="username-label">
                            Username: {isEditMode ? (
                                <>
                                    {employeeData.username}
                                    <span className="edit-restriction-message"> *can not edit</span>
                                </>
                            )
                            : employeeData.username}
                        </label>
                    </div>
                </div>
                <div className="new-employee-role">
                    <label id="role-label">
                        Role: {isEditMode ? (
                        <select defaultValue={employeeData.role}>
                            {
                                rolesList.map((role) => (
                                    <option key={role} value={role}> {role} </option>
                                ))
                            }
                        </select>
                    ) : employeeData.role}
                    </label>
                    <div className="new-employee-password">
                        <label id="password-label">
                            Password: {isEditMode ?
                            <div>
                            <input type="password" defaultValue={employeeData.password}/>
                            <label id="confirm-password-label">
                                Confirm password:
                                <input type="password" defaultValue={employeeData.confirmPassword}/>
                            </label>
                            </div> : "*****"
                        }
                        </label>

                    </div>
                </div>
            </form>
            <Button buttonName={isEditMode ? "Save" : "Edit Recipe"}
                    onClick={isEditMode ? handleSaveClick : handleEditClick}/>
        </div>
    );

}

export default EmployeeDetailsForm;