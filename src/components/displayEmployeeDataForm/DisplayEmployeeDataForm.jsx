import "./DisplayEmployeeDataForm.css"

// eslint-disable-next-line react/prop-types
function DisplayEmployeeDataForm({employeeData}){
    return (
        <form className= "display-employee">
            <div className="new-employee-name">
                <div className="new-employee-firstname">
                    <label id="firstname-label">
                        firstname: {employeeData.firstname}
                    </label>
                </div>
                <div className="new-employee-lastname">
                    <label id="lastname-label">
                        lastname: {employeeData.lastname}
                    </label>
                </div>
            </div>
            <div className="new-employee-contact">
                <label id="email-label">
                    email: {employeeData.email}
                </label>
                <label id="phone-number-label">
                    Mobile Number: {employeeData.phone}
                </label>
            </div>
            <div className="new-employee-credentials">
                <div className="new-employee-username">
                    <label id="username-label">
                        username: {employeeData.username}
                    </label>

                </div>

            </div>
            <div className="new-employee-role">
                <label id="role-label">
                    role: {employeeData.role}
                </label>
            </div>
        </form>

    )
}
export default DisplayEmployeeDataForm;