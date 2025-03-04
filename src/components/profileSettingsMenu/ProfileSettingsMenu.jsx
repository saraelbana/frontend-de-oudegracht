import  "./ProfileSettingsMenu.css";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";

function ProfileSettingsMenu() {
    const navigate = useNavigate();
    const {logoutHandler, user} = useContext(AuthContext);
    const {username} = localStorage.getItem("user_username");
    const handleLogout = () => {
        logoutHandler();
    };
    const handleProfileClick = () => {
        const username = localStorage.getItem("user_username");
        navigate(`/portal/employee/${user.username}`);
    };
    return(
        <div className="settings-menu-overlay">
            <div className="settings-menu">
              <div className="settings-list">
                    <ul className="list-items">
                        <li>
                            <Button
                                className="profile-settings-menu-link"
                                onClick={handleProfileClick}
                                text= "Profile"
                            />
                        </li>
                        <li>
                            <Button
                                className="logout-settings-menu-link"
                                onClick={handleLogout}
                                text= "Logout"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettingsMenu;