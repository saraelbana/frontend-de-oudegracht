import "./RecipesRecordsTableRow.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import {DELETE_ICON, EDIT_ICON} from "../../constants/AssetsFilesNames.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";
import {deleteRecipe} from "../../helpers/APIOperations.js";

// eslint-disable-next-line react/prop-types
function RecipesRecordsTableRow({ recipe }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleRecipeNameClick = () => {
        navigate(`/portal/recipe/${recipe.id}?edit=false`);
    };
    const handleEditClick = () => {
        // Navigate with edit mode parameter
        navigate(`/portal/recipe/${recipe.id}?edit=true`);
    };
    const handleDeleteClick = async () => {
        if (user.role === "ADMIN") {
            try {
                const response = await deleteRecipe(recipe.id);
                if (response[0] === 1) {
                    setSuccess("Recipe deleted successfully");
                    setError("");
                    setTimeout(() => {
                        navigate("/portal/recipes");
                    }, 5000);
                }

            } catch (error) {
                console.error(`Failed to delete recipe with id: ${recipe.id}`);
                setError("Failed to delete recipe");
                setSuccess("");
            }
        }
    }
    const {user} = useContext(AuthContext);

    return (
        <tr>
            <td
                onClick={handleRecipeNameClick}
                className="recipe-name-data-table-cell"
            >
                {/* eslint-disable-next-line react/prop-types */}
                {recipe.recipeName}
            </td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{recipe.category || 'Uncategorized'}</td>
            {   (user.role === "ADMIN" || user.role === "CHEF") &&
                <td>
                    <div className="table-action-buttons">
                        <Button
                            size="icon"
                            iconSrc={EDIT_ICON}
                            onClick={handleEditClick}
                            className="edit-btn"
                        />
                    </div>
                </td>
            }
            {   (user.role === "ADMIN") &&
                <td>
                    <div className="table-action-buttons">
                        <Button
                            size="icon"
                            iconSrc={DELETE_ICON}
                            onClick={handleDeleteClick}
                            className="delete-btn"
                        />
                    </div>
                </td>
            }
            {error && <td className="error-message">{error}</td>}
            {success && <td className="success-message">{success}</td>}
        </tr>
    );
}

export default RecipesRecordsTableRow;