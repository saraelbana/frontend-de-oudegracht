import "./DashboardSideMenu.css";
import {NavLink} from "react-router-dom";
function DashboardSideMenu(prop) {
    return(
            <ul className="dashboard-side-menu-list">
                <li>
                    <NavLink 
                        to="/portal" 
                        end 
                        className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} 
                        onClick={prop.onClick}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/employee" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                        Employees
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/recipe" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/menu" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                        Menu
                    </NavLink>
                </li>
            </ul>
    );
}
export default DashboardSideMenu;