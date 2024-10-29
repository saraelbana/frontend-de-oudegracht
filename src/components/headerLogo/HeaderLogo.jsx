import "./HeaderLogo.css";
import Logo from "../logo/Logo.jsx";
function HeaderLogo(){
    return(
        <div className="header-logo">
            <Logo imgAddress ='/src/assets/logo-100x100.png' />
        </div>
    );
}
export default HeaderLogo;