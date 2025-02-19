import "./EmployeesRecordsTableRow.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import {DELETE_ICON, EDIT_ICON} from "../../constants/AssetsFilesNames.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
import {deleteEmployee} from "../../helpers/APIOperations.js";

function EmployeesRecordsTableRow({ employee }) {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleUsernameClick = () => {
        navigate(`/portal/employee/${employee.username}`);
    };
    const handleEditClick = () => {
        navigate(`/portal/employee/${employee.username}?edit=true`);
    };
    const handleDeleteClick = async () => {
        if (user.role === "ADMIN" && employee.role !== "ADMIN") {
            try {
                const response = await deleteEmployee(employee.username);
                if (response[0] === 1) {
                    setSuccess("Employee deleted successfully");
                    setError("");
                    setTimeout(() => {
                        navigate("/portal/employee");
                    }, 5000);
                }
            } catch (error) {
                console.error(`Failed to delete employee with username: ${employee.username}`);
                setError("Failed to delete employee");
                setSuccess("");
            }
        }
    }

    return (
        <tr>
            <td>{employee.firstname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.email}</td>
            <td>{employee.phone || 'N/A'}</td>
            <td
                onClick={handleUsernameClick}
                className="employee-username-data-navlink">
                {employee.username}
            </td>
            <td>{employee.role || 'Employee'}</td>
            {
                (user.role === "ADMIN") &&
                (
                    <div className="table-action-buttons">
                        <td>
                            <div className="table-action-buttons">
                                <Button
                                    size="icon"
                                    iconSrc={EDIT_ICON}
                                    onClick={handleEditClick}
                                    className="edit-button"
                                />
                            </div>
                        </td>
                        {   (employee.role !== "ADMIN") &&
                            <td>
                                <div className="table-action-buttons">
                                    <Button
                                        size="icon"
                                        iconSrc={DELETE_ICON}
                                        onClick={handleDeleteClick}
                                        className="delete-button"
                                    />
                                </div>
                            </td>
                        }
                    </div>
                )
            }
            {error && <td className="error-message">{error}</td>}
            {success && <td className="success-message">{success}</td>}
        </tr>
    );
}

EmployeesRecordsTableRow.propTypes = {
    employee: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }).isRequired,
};

export default EmployeesRecordsTableRow;