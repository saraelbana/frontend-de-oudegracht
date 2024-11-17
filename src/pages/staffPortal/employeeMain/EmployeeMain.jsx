import "./EmployeeMain.css";
import DashboardSideMenu from "../../../components/dashboardSideMenu/DashboardSideMenu.jsx";
import Dashboard from "../../../components/dashboard/Dashboard.jsx";
import IconButton from "../../../components/iconButton/IconButton.jsx";
import {SettingsIcon} from "../../../constants/AssetsFilesNames.js";
import WelcomeMessage from "../../../components/welcomeMessage/WelcomeMessage.jsx";
import {useState} from "react";
import ProfileSettingsMenu from "../../../components/profileSettingsMenu/ProfileSettingsMenu.jsx";
import EmployeeDetailsForm from "../../../components/employeeDetailsForm/EmployeeDetailsForm.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";


function EmployeeMain() {
    const [isProfileSettingsVisible, setProfileSettingsVisible] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Dashboard");
    const navigate = useNavigate();

    const handleIconClick = () => {
        setProfileSettingsVisible(!isProfileSettingsVisible);

    };
    const handleProfileClick = () => {
        navigate("/portal/employee");
        setActiveComponent("EmployeeDetailsForm");
        // setProfileSettingsVisible(false);
    };
    const handleDashboardClick = () => {
        navigate("/portal");
        setActiveComponent("Dashboard");
        setProfileSettingsVisible(false);
    };

    return(
            <article className = "employee-dashboard" >
                <section className="employee-settings-section">
                    <WelcomeMessage name = "Employee"/>
                    <IconButton iconSrc={SettingsIcon} onClick={handleIconClick} />
                </section>
                {isProfileSettingsVisible && <ProfileSettingsMenu onClick={handleProfileClick}/>}
                <section className="employee-main">
                    <section className="dashboard-side-menu">
                        <DashboardSideMenu onClick={handleDashboardClick}/>

                    </section>
                    <section className="employee-main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            {/*<Route path="/menu" element={<Menu/>}/>*/}
                            {/*<Route path="/recipes" element=/!*</>*!//>*/}
                            <Route path="/employee"
                                   element={<EmployeeDetailsForm employeeData={{ /* pass employee data here */}}/>}/>

                        </Routes>
                        {/*{activeComponent === "Dashboard" ? <Dashboard/> :*/}
                        {/*    <EmployeeDetailsForm employeeData={{ /* pass employee data here *!/}/>}*/}
                    </section>
                </section>

            </article>
    );
}

export default EmployeeMain;