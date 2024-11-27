import "./RecipesDashboard.css";
import RecipesCategoriesTabsMenu from "../recipesCategoriesTabsMenu/RecipesCategoriesTabsMenu.jsx";
import {Route, Routes} from "react-router-dom";
function RecipesDashboard() {

    return(
        //
        // {/*loop to fetch all recipes and display them here in a list*/}
        <div className="recipes-list">
            <RecipesCategoriesTabsMenu/>
            <Routes>
                <Route path="/portal/recipe/main-dish" element={<div><p>main dish</p></div>}/>
                <Route path="/portal/recipe/salad" element={<div><p>salad</p></div>}/>
                <Route path="/portal/recipe/side-dish" element={<div><p>side dish</p></div>}/>
                <Route path="/portal/recipe/dessert" element={<div><p>dessert</p></div>}/>
                <Route path="/portal/recipe/appetizer" element={<div><p>appetizer</p></div>}/>
            </Routes>
            <table>
                <tr>
                    <th>Recipe Name</th>
                    <th>Category</th>
                </tr>
                {/*//loop to get the recipes and display them in a table*/}
            </table>
        </div>
    );
}
export default RecipesDashboard;