import "./ProfileHeader.css";
import ProfileSettingsMenu from "../profileSettingsMenu/ProfileSettingsMenu.jsx";
function ProfileHeader() {
    const name = "Chef Alex"
    return(
        <div className="profile-header">
            <div className="profile-header-content">
                <h1>welcome, {name} </h1>
                <ProfileSettingsMenu/>
            </div>
        </div>
    );
}
export default ProfileHeader;