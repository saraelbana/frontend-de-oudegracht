import "./DisplayMenu.css";
import Button from "../button/Button.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useLocation, useNavigate} from "react-router-dom";
import MenuDataTable from "../menuDataTable/MenuDataTable.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
function DisplayMenu(){

    const navigate = useNavigate();
    const location = useLocation();
    const handleAddMenuItem = () => {
        navigate("/portal/menu/new-item");
        //reload the page

    };
    const isPortalPath = location.pathname.includes("portal");
    const {user} = useContext(AuthContext);
    return(
        <div className="menu-display">
            <h1>De Oudegracht Menu</h1>
            <MenuDataTable/>
            {isPortalPath && (
                <div className="add-button-container">
                    {
                        ( user.role === "ADMIN" || user.role === "CHEF") &&
                        <Button iconSrc={ADD_ICON} text="Add New Item" onClick={handleAddMenuItem} />
                    }
                </div>
            )}
        </div>
    );
}
export default DisplayMenu;