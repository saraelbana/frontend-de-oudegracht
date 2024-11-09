import "./EmployeeDetailsForm.css"
import Button from "../button/Button.jsx";

function EmployeeDetailsForm({employeeData}){
    return (
        <form className= "display-employee">
            <div className="new-employee-name">
                <div className="new-employee-firstname">
                    <label id="firstname-label">
                        Firstname: {employeeData.firstname}
                    </label>
                </div>
                <div className="new-employee-lastname">
                    <label id="lastname-label">
                        Lastname: {employeeData.lastname}
                    </label>
                </div>
            </div>
            <div className="new-employee-contact">
                <label id="email-label">
                    Email: {employeeData.email}
                </label>
                <label id="phone-number-label">
                    Phone Number: {employeeData.phone}
                </label>
            </div>
            <div className="new-employee-credentials">
                <div className="new-employee-username">
                    <label id="username-label">
                        Username: {employeeData.username}
                    </label>
                </div>

            </div>
            <div className="new-employee-role">
                <label id="role-label">
                    role: {employeeData.role}
                </label>
            </div>
            <Button buttonName="Edit Profile" />
        </form>

    )
}
export default EmployeeDetailsForm;