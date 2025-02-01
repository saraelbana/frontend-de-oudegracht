import React from "react";
import "./WelcomeMessage.css";

function WelcomeMessage({name}) {
    // If no name prop is passed, try to get it from localStorage
    const userName = localStorage.getItem("userName") || "there!";
    
    return (
        <div className="welcome-message">
            <h2>Welcome, {userName}!</h2>
        </div>
    );
}

export default WelcomeMessage;