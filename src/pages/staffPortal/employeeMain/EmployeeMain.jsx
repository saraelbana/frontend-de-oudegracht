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
import RecipesDashboard from "../../../components/recipesDashboard/RecipesDashboard.jsx";
import EmployeesDataTable from "../../../components/employeesDataTable/EmployeesDataTable.jsx";


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
            <article className = "employee-main-article" >
                <section className="employee-header-settings-section">
                    <WelcomeMessage name = "Employee name"/>
                    <IconButton iconSrc={SettingsIcon} onClick={handleIconClick} />
                </section>
                {isProfileSettingsVisible && <ProfileSettingsMenu onClick={handleProfileClick}/>}
                <section className="employee-main">
                    <section className="dashboard-side-menu">
                        <DashboardSideMenu onClick={handleDashboardClick}/>

                    </section>
                    <section className="employee-dashboard-main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            {/*<Route path="/menu" element={<Menu/>}/>*/}
                            <Route path="/recipe" element={<RecipesDashboard/>}/>
                            <Route path="/menu" element={<RecipesDashboard/>}/>
                            <Route path="/employee"
                                   element={< EmployeesDataTable/>}/>
                        </Routes>
                        {/*{activeComponent === "Dashboard" ? <Dashboard/> :*/}
                        {/*    <EmployeeDetailsForm employeeData={{ /* pass employee data here *!/}/>}*/}
                    </section>
                </section>

            </article>
    );
}

export default EmployeeMain;