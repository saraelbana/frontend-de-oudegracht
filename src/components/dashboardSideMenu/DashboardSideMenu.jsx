import "./DashboardSideMenu.css";
import {NavLink} from "react-router-dom";
function DashboardSideMenu(prop) {
    return(
        <div className="dashboard-side-menu">
            <ul className="dashboard-side-menu-items">
                <li>
                    <NavLink to="/portal" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'} onClick={prop.onClick}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/employees" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/employees" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Daily Specials
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
export default DashboardSideMenu;