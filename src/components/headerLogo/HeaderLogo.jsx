import "./HeaderLogo.css";
import Logo from "../logo/Logo.jsx";
import {HeaderLogoImg} from "../../constants/AssetsFilesNames.js";

function HeaderLogo(){
    return(
        <div className="header-logo">
            <Logo imgAddress ={HeaderLogoImg} />
        </div>
    );
}
export default HeaderLogo;