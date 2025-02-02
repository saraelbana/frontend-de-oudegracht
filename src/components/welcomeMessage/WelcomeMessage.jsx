import React from "react";
import "./WelcomeMessage.css";

// eslint-disable-next-line react/prop-types
function WelcomeMessage({name}) {
    // If no name prop is passed, try to get it from localStorage
    const username = localStorage.getItem("user_username") || "there!";
    
    return (
        <div className="welcome-message">
            <h2>
                Welcome, {name || username}!
            </h2>
        </div>
    );
}

export default WelcomeMessage;