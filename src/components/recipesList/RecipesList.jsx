import "./RecipesList.css";
function RecipesList() {
    return(
        //
        // {/*loop to fetch all recipes and display them here in a list*/}
        <div className="recipes-list">
            <h2>Recipes Management</h2>
            <ul>
                <li>Main Dish</li>
                <li>Salad</li>
                <li>Side dish</li>
                <li>Dessert</li>
                <li>Appetizers</li>
            </ul>
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
export default RecipesList;