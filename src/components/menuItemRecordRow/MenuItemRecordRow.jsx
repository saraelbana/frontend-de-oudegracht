import "./MenuItemRecordRow.css";
import Button from "../button/Button.jsx";
import {DELETE_ICON} from "../../constants/AssetsFilesNames.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {deleteMenuItem} from "../../helpers/APIOperations.js";

function MenuItemRecordRow(prop){
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isPortalPath = location.pathname.includes("/portal");
    console.log('Current path:', location.pathname);
    console.log('Is portal path:', isPortalPath);
    const handleDeleteClick = async () => {
        try {
            console.log(`Deleting item with id: ${prop.item.id}`);
            const response = await deleteMenuItem(prop.item.id); // Call the delete API with the item ID
            if (response[0] === 1) {
                console.log(`Item with id: ${prop.id} deleted successfully`);
                //better to confirm before deleting
                setSuccess("Item deleted successfully");
                setError("");
                navigate(`/portal/menu`);

                window.location.reload();
            }
        }
        catch (error) {
            console.error(`Failed to delete item with id: ${prop.id}`);
            setError("Failed to delete item");
            setSuccess("");
        }
    }
    return(
        <tr className="menu-item-record-row">
            <td>{prop.item.name}</td>
            <td>€{prop.item.price}</td>
            <td>{prop.item.category}</td>
            <td>
                {console.log('Delete icon path:', DELETE_ICON)}
                {isPortalPath && (
                    <div className="table-action-buttons">
                        <Button
                            size="icon"
                            iconSrc={DELETE_ICON}
                            onClick={handleDeleteClick}
                            text="Delete"
                        />
                    </div>
                )}
            </td>
        </tr>
    );
}

export default MenuItemRecordRow;