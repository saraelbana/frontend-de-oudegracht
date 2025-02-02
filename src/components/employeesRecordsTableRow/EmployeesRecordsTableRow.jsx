import "./EmployeesRecordsTableRow.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import { EDIT_ICON } from "../../constants/AssetsFilesNames.js";

function EmployeesRecordsTableRow({ employee }) {
    const navigate = useNavigate();
    const handleUsernameClick = () => {
        navigate(`/portal/employee/${employee.username}`);
    };
    const handleEditClick = () => {
        navigate(`/portal/employee/${employee.username}?edit=true`);
    };

    return (
        <tr>
            <td>{employee.firstname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.email}</td>
            <td>{employee.phone || 'N/A'}</td>
            <td
                onClick={handleUsernameClick}
                className="employee-username-data-navlink"
            >
                {employee.username}
            </td>
            <td>{employee.role || 'Employee'}</td>
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