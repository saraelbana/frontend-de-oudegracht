import "./RecipesRecordsTableRow.css";
import { useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {EDIT_ICON} from "../../constants/AssetsFilesNames.js";

// eslint-disable-next-line react/prop-types
function RecipesRecordsTableRow({recipe}){
    console.log("Recipe data " + recipe);
    const navigate = useNavigate();
    const handleRecipeNameClick = () => {
        // eslint-disable-next-line react/prop-types
        navigate(`/portal/recipe/${recipe.id}?edit=false`);
    };
    const handleEditClick = () => {
        // Navigate with edit mode parameter
        // eslint-disable-next-line react/prop-types
        navigate(`/portal/recipe/${recipe.id}?edit=true`);
    };

    console.log("Recipe data " + recipe);
    return(
        <tr>
            <td 
                onClick={handleRecipeNameClick}
                style={{ 
                    cursor: 'pointer', 
                    color: '#0088ff',
                    textDecoration: 'underline' 
                }}
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