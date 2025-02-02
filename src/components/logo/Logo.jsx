import "./Logo.css";
import { useNavigate } from "react-router-dom";

function Logo(prop){
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <div className="logo" onClick={handleLogoClick}>
            <img src={prop.imgAddress} alt="Logo"/>
        </div>
    );
}

export default Logo;