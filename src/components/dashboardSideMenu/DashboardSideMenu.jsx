import "./DashboardSideMenu.css";
import {NavLink} from "react-router-dom";
function DashboardSideMenu(prop) {
    return(
            <ul className="dashboard-side-menu-list">
                <li>
                    <NavLink to="/portal" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                        Dashboard
                    </NavLink>
                </li>
                <NavLink to="/portal/employee" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                    Employees List
                </NavLink>
                <li>
                    <NavLink to="/portal/recipes" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/employees" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Menu
                    </NavLink>
                </li>
            </ul>
    );
}
export default DashboardSideMenu;