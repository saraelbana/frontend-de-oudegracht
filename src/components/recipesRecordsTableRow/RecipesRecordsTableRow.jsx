import "./RecipesRecordsTableRow.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import { EDIT_ICON } from "../../constants/AssetsFilesNames.js";

// eslint-disable-next-line react/prop-types
function RecipesRecordsTableRow({ recipe }) {
    const navigate = useNavigate();
    const handleRecipeNameClick = () => {
        navigate(`/portal/recipe/${recipe.id}?edit=false`);
    };
    const handleEditClick = () => {
        // Navigate with edit mode parameter
        navigate(`/portal/recipe/${recipe.id}?edit=true`);
    };

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
        </tr>
    );
}

export default RecipesRecordsTableRow;