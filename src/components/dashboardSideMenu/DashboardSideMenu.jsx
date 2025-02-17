import "./DashboardSideMenu.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
import {useContext} from "react";

function DashboardSideMenu(prop) {
    const {user} = useContext(AuthContext);
    return(
            <ul className="dashboard-side-menu-list">
                <li>
                    <NavLink 
                        to="/portal"
                        className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} 
                        onClick={prop.onClick}>

                        Dashboard
                    </NavLink>
                </li>
                <li>
                    {
                        (user.role === "ADMIN" || user.role === "CHEF") &&
                        (<NavLink
                            to="/portal/employee"
                            className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}
                            onClick={prop.onClick}>

                            Employees
                        </NavLink>)
                    }
                </li>
                <li>
                    <NavLink
                        to="/portal/recipe"
                        className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}
                        onClick={prop.onClick}>

                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/portal/menu"
                        className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}
                        onClick={prop.onClick}>

                        Menu
                    </NavLink>
                </li>
            </ul>
    );
}
export default DashboardSideMenu;