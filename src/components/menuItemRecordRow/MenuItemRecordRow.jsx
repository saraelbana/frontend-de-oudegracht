import "./MenuItemRecordRow.css";
import Button from "../button/Button.jsx";
import {DELETE_ICON} from "../../constants/AssetsFilesNames.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {deleteMenuItem} from "../../helpers/APIOperations.js";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";

function MenuItemRecordRow(prop){
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isPortalPath = location.pathname.includes("/portal");
    const {user} = useContext(AuthContext);

    const handleDeleteClick = async () => {
        if(user.role === "ADMIN" || user.role === "CHEF") {
            try {
                const response = await deleteMenuItem(prop.item.id); // Call the delete API with the item ID
                if (response[0] === 1) {

                    setSuccess("Item deleted successfully");
                    setError("");
                    navigate(`/portal/menu`);
                    window.location.reload();
                }
            } catch (error) {
                console.error(`Failed to delete item with id: ${prop.id}`);
                setError("Failed to delete item");
                setSuccess("");
            }
        }
    }

    return(
        <tr className="menu-item-record-row">
            <td>{prop.item.name}</td>
            <td>€{prop.item.price}</td>
            <td>{prop.item.category}</td>
            <td>
                {prop.item.imagePath && (
                    <img src={`http://localhost:8080/uploads/${prop.item.imagePath}`} alt={prop.item.name} style={{ width: '100px', height: 'auto' }} />
                )}
                { isPortalPath && (
                    (user.role ==="ADMIN" || user.role === "CHEF") ? (
                    <div className="table-action-buttons">
                        <Button
                            size="icon"
                            iconSrc={DELETE_ICON}
                            onClick={handleDeleteClick}
                            text="Delete"
                        />
                    </div>
                    ):(<></>)
                )
                }
            </td>
        </tr>
    );
}

export default MenuItemRecordRow;