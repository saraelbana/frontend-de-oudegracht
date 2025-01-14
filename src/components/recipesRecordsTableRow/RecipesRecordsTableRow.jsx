import "./RecipesRecordsTableRow.css";
import { useNavigate} from "react-router-dom";

function RecipesRecordsTableRow({recipe}){
    console.log("Recipe data " + recipe);
    const navigate = useNavigate();

    const handleRecipeIdClick = () => {
        navigate(`/portal/recipes/${recipe.id}`);
    };

    console.log("Recipe data " + recipe);
    return(
        <tr className="recipe-record-row">
            <td className="recipes-table-data recipe-name-data">{recipe.recipeName}</td>
            <td className="recipes-table-data recipe-id-data-navlink">
                <span onClick={handleRecipeIdClick} className="recipe-id-navlink">
                    {recipe.id}
                </span>
            </td>
        </tr>
    );
}

export default RecipesRecordsTableRow;