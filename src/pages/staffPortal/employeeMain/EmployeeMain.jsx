import "./EmployeeMain.css";
import DashboardSideMenu from "../../../components/dashboardSideMenu/DashboardSideMenu.jsx";
import Dashboard from "../../../components/dashboard/Dashboard.jsx";
import IconButton from "../../../components/iconButton/IconButton.jsx";

function EmployeeMain() {
    return(
            <article className = "employee-dashboard" >
                <section className = "employee-header">
                    <IconButton iconSrc ="../../../src/assets/setting-lines-icon.png" />
                    {/*<ProfileSettingsMenu/>*/}
                    <div className="employee-header-content">
                        <section className = "side-menu">
                            <DashboardSideMenu/>
                        </section>
                        <section className="employee-main">
                            <Dashboard/>
                        </section>
                    </div>
                </section>
            </article>
    );
}
export default EmployeeMain;