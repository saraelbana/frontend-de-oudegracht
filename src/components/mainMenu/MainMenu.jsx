import './MainMenu.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
import {useContext} from "react";

function MainMenu(){
    const {user} = useContext(AuthContext);
    return (
        <div className="main-menu-container">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        {   (user && user.role === "GUEST") ? (
                            <NavLink to={`/guest-profile/${user.username}`}
                                     className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>
                                Profile
                            </NavLink>
                            ) : user ? (
                            <NavLink to="/portal"
                                     className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>
                                portal
                            </NavLink>
                        ):(
                            <NavLink to="/login"
                                     className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>
                                Login
                    </NavLink>
                    )
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default MainMenu;