import "./EmployeesRecordsTableRow.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import {EDIT_ICON} from "../../constants/AssetsFilesNames.js";

function EmployeesRecordsTableRow({employee}){
    console.log("Employee data " + employee);
    const navigate = useNavigate();

    const handleUsernameClick = () => {
        navigate(`/portal/employee/${employee.username}`);
    };
    const handleEditClick = () => {
        // Navigate with edit mode parameter
        navigate(`/portal/employee/${employee.username}?edit=true`);
    };

    return(
        <tr className="employee-record-row">
            <td className="employees-table-data employee-firstname-data">{employee.firstname}</td>
            <td className="employees-table-data employee-lastname-data">{employee.lastname}</td>
            <td className="employees-table-data employee-email-data">{employee.email}</td>
            <td className="employees-table-data employee-phone-data">{employee.phone}</td>
            <td className="employees-table-data employee-username-data-navlink"
                onClick={handleUsernameClick}
                style={{ cursor: 'pointer' }}
            >
                {employee.username}
            </td>
            <td className="employees-table-data employee-role-data">{employee.role}</td>
            <td className="edit-button">
                <Button size="icon" iconSrc={EDIT_ICON} onClick={handleEditClick}/>
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