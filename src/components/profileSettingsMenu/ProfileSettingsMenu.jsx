import  "./ProfileSettingsMenu.css";
import {NavLink} from "react-router-dom";

function ProfileSettingsMenu() {
    return(
        <div className="settings-menu-overlay">
            <div className="settings-menu">
              <div className="settings-list">
                    <ul className="list-items">
                        <li>
                            <NavLink
                                to="/portal/profile"
                                className="profile-settings-menu-link"
                                onClick={(e) => handleCategoryClick(category, e)}>

                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/portal/logout"
                                className="logout-settings-menu-link"
                                onClick={(e) => handleCategoryClick(category, e)}>

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