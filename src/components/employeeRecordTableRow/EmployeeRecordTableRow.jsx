import "./EmployeeRecordTableRow.css";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

function EmployeeRecordTableRow({employee}){
    console.log("Employee data " + employee);

    return(
        <tr className="employee-record-row">
            <td className="employee-firstname-data">{employee.firstname}</td>
            <td className="employee-lastname-data">{employee.lastname}</td>
            <td className="employee-email-data">{employee.email}</td>
            <td className="employee-phone-data">{employee.phone}</td>
            <td className="employee-data-username-navlink">
                <NavLink to="/portal/employee/${employee.username}" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} >
                    {employee.username}
                </NavLink>
            </td>
            <td className="employee-role-data">{employee.role}</td>
        </tr>

    );
}
EmployeeRecordTableRow.propTypes = {
    employee: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }).isRequired,
};
export default EmployeeRecordTableRow;