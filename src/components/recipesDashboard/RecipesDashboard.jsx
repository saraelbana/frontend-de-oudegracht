import "./RecipesDashboard.css";
import RecipesCategoriesTabsMenu from "../recipesCategoriesTabsMenu/RecipesCategoriesTabsMenu.jsx";
import {Route, Routes} from "react-router-dom";
function RecipesDashboard() {

    return(
        //
        // {/*loop to fetch all recipes and display them here in a list*/}
        <div className="recipes-list">
            <RecipesCategoriesTabsMenu/>

            <table>
                <tr>
                    <th>Recipe Name</th>
                </tr>
            </table>
        </div>
    );
}
export default RecipesDashboard;