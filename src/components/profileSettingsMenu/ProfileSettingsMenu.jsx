import  "./ProfileSettingsMenu.css";

function ProfileSettingsMenu(prop) {
    return(
        <div className="settings-menu-overlay">
            <div className="settings-menu">
              <div className="settings-list">
                    <ul className="list-items">
                        <li onClick={prop.onClick}>Profile</li>
                        <li onClick={prop.onClick}>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettingsMenu;