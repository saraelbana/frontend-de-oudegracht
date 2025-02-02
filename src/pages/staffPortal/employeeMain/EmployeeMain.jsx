import "./EmployeeMain.css";
import "./EmployeeMainTable.css";
import DashboardSideMenu from "../../../components/dashboardSideMenu/DashboardSideMenu.jsx";
import Dashboard from "../../../components/dashboard/Dashboard.jsx";
import {SettingsIcon} from "../../../constants/AssetsFilesNames.js";
import WelcomeMessage from "../../../components/welcomeMessage/WelcomeMessage.jsx";
import {useState} from "react";
import ProfileSettingsMenu from "../../../components/profileSettingsMenu/ProfileSettingsMenu.jsx";
import {Route, RouterProvider, Routes, useNavigate} from "react-router-dom";
import EmployeesDataTable from "../../../components/employeesDataTable/EmployeesDataTable.jsx";
import EmployeeDetailsForm from "../../../components/employeeDetailsForm/EmployeeDetailsForm.jsx";
import RecipesDataTable from "../../../components/recipesDataTable/RecipesDataTable.jsx";
import RecipeDetailsForm from "../../../components/recipeDetailsForm/RecipeDetailsForm.jsx";
import Button from "../../../components/button/Button.jsx";
import DisplayMenu from "../../../components/displayMenu/DisplayMenu.jsx";
import AddNewEmployee from "../../../components/addNewEmployee/AddNewEmployee.jsx";
import AddNewRecipe from "../../../components/addNewRecipe/AddNewRecipe.jsx";
import AddNewIngredient from "../../../components/addNewIngredient/AddNewIngredient.jsx";
import AddMenuItem from "../../../components/addMenuItem/AddMenuItem.jsx";

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
        setProfileSettingsVisible(false);
    };

    return(
            <article className = "employee-main-article" >
                <section className="employee-header-settings-section">
                    <WelcomeMessage />
                    <Button iconSrc={SettingsIcon} onClick={handleIconClick} />
                </section>
                {isProfileSettingsVisible && <ProfileSettingsMenu onClick={handleProfileClick}/>}
                <section className="employee-main">
                    <section className="dashboard-side-menu">
                        <DashboardSideMenu onClick={handleDashboardClick}/>
                    </section>
                    <section className="employee-dashboard-main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/recipe" element={<RecipesDataTable/>}/>
                            <Route path="/recipe/:id" element={<RecipeDetailsForm/>}/>
                            <Route path="/menu" element={<DisplayMenu/>}/>
                            <Route path="/menu/new-item" element={<AddMenuItem/>}/>
                            <Route path="/employee" element={<EmployeesDataTable/>}/>
                            <Route path="/employee/:username" element={<EmployeeDetailsForm/>}/>
                            <Route path="/profile" element={<EmployeeDetailsForm/>}/>
                            <Route path="/logout" element={<EmployeeDetailsForm/>}/>
                            <Route path="/employee/new" element={<AddNewEmployee/>}/>
                            <Route path="/recipe/new" element={<AddNewRecipe/>}/>
                            <Route path="/ingredient/new" element={<AddNewIngredient/>}/>
                        </Routes>
                        {/*{activeComponent === "Dashboard" ? <Dashboard/> :*/}
                        {/* <EmployeeDetailsForm employeeData={{ /* pass employee data here *!/}/>}*/}
                    </section>
                </section>
            </article>
    );
}

export default EmployeeMain;