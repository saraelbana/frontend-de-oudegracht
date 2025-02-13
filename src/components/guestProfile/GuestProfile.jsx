import "./GuestProfile.css";
import WelcomeMessage from "../welcomeMessage/WelcomeMessage.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {deoudegrachtApi, guestEndpoint} from "../../deoudegrachtApi.js";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";

function GuestProfile(){
    const {username} = useParams();
    const [guestData, setGuestData] = useState(null);
    const [error, setError] = useState("");
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGuestData = async () => {
            if(user.username === username)
            {
                try {
                    const response = await deoudegrachtApi.get(`${guestEndpoint}/${username}`);

                    setGuestData(response.data);
                } catch (error) {

                    setError("Error fetching guest data" + error);
                }
            }
            else{
                navigate("/notfound")
            }
        };
        fetchGuestData();
    }, [username]);
    return (
        guestData ?
                <div className="guest-profile">
                    <WelcomeMessage name={guestData.firstname}/>
                    <form className="guest-profile-form">
                        <div className="guest-name">
                            <div className="guest-firstname">
                                <label id="firstname-label">
                                    Firstname:
                                </label>
                                <label>
                                    {guestData.firstname}
                                </label>
                                <label id="lastname-label">
                                    Lastname:
                                </label>
                                <label>
                                    {guestData.lastname}
                                </label>
                            </div>
                        </div>
                        <div className="guest-contact">
                            <label id="email-label">
                                Email:
                            </label>
                            <label>
                                {guestData.email}
                            </label>
                        </div>
                    </form>
                </div>
            : <div>{error}</div>

    )
}

export default GuestProfile;