import  "./ProfileSettingsMenu.css";

function ProfileSettingsMenu() {
    return(
        <div className="settings-menu-overlay">
            <div className="settings-menu">
              <div className="settings-list">
                    <ul className="list-items">
                        <li>Profile</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettingsMenu;