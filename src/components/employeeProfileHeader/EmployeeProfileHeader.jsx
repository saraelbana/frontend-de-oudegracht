import "./EmployeeProfileHeader.css";
import WelcomeMessage from "../welcomeMessage/WelcomeMessage.jsx";
import ImageContainer from "../imageContainer/ImageContainer.jsx";

function EmployeeProfileHeader({employeeData}){
    return (
        <div className="employee-profile-header">
            <WelcomeMessage name={employeeData.firstname} />
            <ImageContainer image={employeeData.photo} alt ="employee-photo"/>

        </div>
    )
}
export default EmployeeProfileHeader;