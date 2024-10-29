import "./MainHeader.css";
import HeaderLogo from "../headerLogo/HeaderLogo.jsx";

function MainHeader() {
    return(
        <header className="main-header">
            <HeaderLogo/>
            <h2>De Oudegracht</h2>
        </header>
    )
}
export default MainHeader;