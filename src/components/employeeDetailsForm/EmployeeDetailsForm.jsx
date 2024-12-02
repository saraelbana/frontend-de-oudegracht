import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deoudegrachtApi, employeesEndpoint } from "../../deoudegrachtApi.js";
import Button from "../button/Button.jsx";
import EmployeeProfileHeader from "../employeeProfileHeader/EmployeeProfileHeader.jsx";

function EmployeeDetailsForm() {
    const { username } = useParams();
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await deoudegrachtApi.get(`${employeesEndpoint}/${username}`);
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Error fetching employee data", error);
            }
        };

        fetchEmployeeData();
    }, [username]);

    if (!employeeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-details-form">
            <div className="employee-header">
                <EmployeeProfileHeader employeeData={employeeData} />
            </div>
            <form className="display-employee">
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
                        Role: {employeeData.role}
                    </label>
                </div>
            </form>
            <Button buttonName="Edit Profile" />
        </div>
    );
}

export default EmployeeDetailsForm;