import "./EmployeeMain.css";
import DashboardSideMenu from "../../../components/dashboardSideMenu/DashboardSideMenu.jsx";
import Dashboard from "../../../components/dashboard/Dashboard.jsx";
import IconButton from "../../../components/iconButton/IconButton.jsx";
import {SettingsIcon} from "../../../constants/AssetsFilesNames.js";
import WelcomeMessage from "../../../components/welcomeMessage/WelcomeMessage.jsx";
import {useState} from "react";
import ProfileSettingsMenu from "../../../components/profileSettingsMenu/ProfileSettingsMenu.jsx";


function EmployeeMain() {
    const [isProfileSettingsVisible, setProfileSettingsVisible] = useState(false);

    const handleIconClick = () => {
        setProfileSettingsVisible(!isProfileSettingsVisible);
    };
    return(
            <article className = "employee-dashboard" >
                <section className="employee-settings-section">
                    <WelcomeMessage name = "Employee"/>
                    <IconButton iconSrc={SettingsIcon} onClick={handleIconClick} />
                </section>
                {isProfileSettingsVisible && <ProfileSettingsMenu />}
                <section className="employee-main">
                    <section className="dashboard-side-menu">
                        <DashboardSideMenu/>
                    </section>
                    <section className="employee-main-content">
                        <Dashboard/>
                    </section>
                </section>

            </article>
    );
}

export default EmployeeMain;