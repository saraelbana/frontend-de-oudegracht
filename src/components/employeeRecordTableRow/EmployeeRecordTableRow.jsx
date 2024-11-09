import PropTypes from 'prop-types';

function EmployeeRecordTableRow({employee}){
    console.log("Employee data " + employee);

    return(
        <tr>
            <td>{employee.firstname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.username}</td>
            <td>{employee.role}</td>
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