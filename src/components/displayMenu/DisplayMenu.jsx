import "./DisplayMenu.css";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
import Button from "../button/Button.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useNavigate} from "react-router-dom";
function DisplayMenu(){

    const navigate = useNavigate();
    const handleAddMenuItem = () => {
        navigate("/portal/menu/new-item");
    }
    return(
        <div className="menu-display">
            <h1>De Oudegracht Menu</h1>
            <FoodCategoryNavbar/>
            <Button iconSrc={ADD_ICON} text="Add New Item" size="large" onClick={handleAddMenuItem}/>
        </div>
    );
}
export default DisplayMenu;