import "./RecipesRecordsTableRow.css";
import { useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {EDIT_ICON} from "../../constants/AssetsFilesNames.js";
import {useState} from "react";

function RecipesRecordsTableRow({recipe}){
    console.log("Recipe data " + recipe);
    const navigate = useNavigate();
    const handleRecipeIdClick = () => {
        navigate(`/portal/recipe/${recipe.id}`);
    };
    const handleEditClick = () => {
        // Navigate with edit mode parameter
        navigate(`/portal/recipe/${recipe.id}?edit=true`);
    };

    console.log("Recipe data " + recipe);
    return(
        <tr className="recipe-record-row">
            <td className="recipes-table-data recipe-name-data-table-cell" onClick={handleRecipeIdClick}
                style={{ cursor: 'pointer' }}>{recipe.recipeName}</td>
            <td className="recipes-table-data recipe-name-data">{recipe.category}</td>
            <td className="edit-button">
                <Button size="icon" iconSrc={EDIT_ICON} onClick={handleEditClick}/>
            </td>
        </tr>
    );
}

export default RecipesRecordsTableRow;