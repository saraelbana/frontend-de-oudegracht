import "./EmployeesRecordsTableRow.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function EmployeesRecordsTableRow({employee}){
    console.log("Employee data " + employee);
    const navigate = useNavigate();

    const handleUsernameClick = () => {
        navigate(`/portal/employee/${employee.username}`);
    };
    return(
        <tr className="employee-record-row">
            <td className="employees-table-data employee-firstname-data">{employee.firstname}</td>
            <td className="employees-table-data employee-lastname-data">{employee.lastname}</td>
            <td className="employees-table-data employee-email-data">{employee.email}</td>
            <td className="employees-table-data employee-phone-data">{employee.phone}</td>
            <td className="employees-table-data employee-username-data-navlink">
                <span onClick={handleUsernameClick} className="username-navlink">
                    {employee.username}
                </span>
            </td>
            <td className="employees-table-data employee-role-data">{employee.role}</td>
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