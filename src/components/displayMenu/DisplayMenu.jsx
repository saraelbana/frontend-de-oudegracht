import "./DisplayMenu.css";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
import Button from "../button/Button.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useLocation, useNavigate} from "react-router-dom";
import MenuDataTable from "../menuDataTable/MenuDataTable.jsx";
function DisplayMenu(){

    const navigate = useNavigate();
    const location = useLocation();
    const handleAddMenuItem = () => {
        navigate("/portal/menu/new-item");
    };
    const isPortalPath = location.pathname.includes("portal");
    return(
        <div className="menu-display">
            <h1>De Oudegracht Menu</h1>
            <MenuDataTable/>
            {isPortalPath && (
                <Button iconSrc={ADD_ICON} text="Add New Item" size="large" onClick={handleAddMenuItem} />
            )}
        </div>
    );
}
export default DisplayMenu;