import  "./ProfileSettingsMenu.css";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function ProfileSettingsMenu() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("http://localhost:5173");
    };
    const handleProfileClick = () => {
        navigate("/employee/:username");
    };
    return(
        <div className="settings-menu-overlay">
            <div className="settings-menu">
              <div className="settings-list">
                    <ul className="list-items">
                        <li>
                            <NavLink
                                to="/portal/profile"
                                className="profile-settings-menu-link"
                                onClick={handleProfileClick}>

                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/portal/logout"
                                className="logout-settings-menu-link"
                                onClick={handleLogout}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettingsMenu;