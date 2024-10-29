import "./ProfileCard.css";
import ImageContainer from "../imageContainer/ImageContainer.jsx";
import Button from "../button/Button.jsx";
function ProfileCard() {
    const profileObject = {
        name: "John Doe",
        imgSrc: "/src/assets/profile-image.jpg",
        imgAlt: "John Doe"
    }
    return (
        <div className="profile-card">
            <section className="profile-header">
                <ImageContainer source={profileObject.imgSrc} alt={profileObject.imgAlt} />
                <div className="employee-name-tag">
                    <p> Employee name </p>
                    <p>Employee Title </p>
                </div>
                <Button text="Edit Profile" />
            </section>
            <h2 className="">
                Profile Details
            </h2>
            <section className="">
                <form className="profile-form">
                    <label htmlFor="full-name" id="full-name">
                        Full Name:
                        <input type='text' id="full-name-field"/>
                    </label>
                    <label htmlFor="email" id="email">
                        Email:
                        <input type='text' id="email-field"/>
                    </label>
                    <label htmlFor="phone" id="phone">
                        Phone:
                        <input type='text' id="phone-field"/>
                    </label>
                    <label htmlFor="password" id="password">
                        password:
                        <input type='text' id="password-field"/>
                    </label>
                </form>
            </section>
        </div>
    )
}

export default ProfileCard;