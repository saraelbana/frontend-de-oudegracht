import "./RecipesDataTable.css";
import RecipeTableRow from "../recipeTableRow/RecipeTableRow.jsx";

function RecipesDataTable(){
    return(
        <div className="recipes-data-table">
            <table>
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Category</th>
                        <th>Recipe ID</th>
                    </tr>
                </thead>
                <tbody>
                    <RecipeTableRow recipe={}/>
                </tbody>
            </table>
        </div>
    );
}
export default RecipesDataTable;