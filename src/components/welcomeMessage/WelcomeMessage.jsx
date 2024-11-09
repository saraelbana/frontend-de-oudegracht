import "./WelcomeMessage.css";

function WelcomeMessage(prop){
    return(
        <div className="welcome-message">
            <h1>Welcome {prop.name} </h1>
            <p>Manage your profile and dashboard</p>
        </div>
    );
}
export default WelcomeMessage;