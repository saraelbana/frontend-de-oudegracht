import "./RecipesDashboard.css";
import RecipesCategoriesTabsMenu from "../recipesCategoriesTabsMenu/RecipesCategoriesTabsMenu.jsx";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {deoudegrachtApi, recipesEndpoint} from "../../deoudegrachtApi.js";
import EmployeesRecordsTableRow from "../employeesRecordsTableRow/EmployeesRecordsTableRow.jsx";
import RecipesRecordsTableRow from "../recipesRecordsTableRow/RecipesRecordsTableRow.jsx";
function RecipesDashboard() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchAllrecipes = async ()=>{
            try {
                const response = await deoudegrachtApi.get(recipesEndpoint);
                console.log("Employees data fetched", response.data);
                setRecipes(response.data);
                setLoading(false);
            }
            catch (e){

                console.log("Error fetching recipes", e.data);
                setLoading(false);
                setError(e);
                // this fragment is commented out for testing purposes
                setRecipes([{
                    "firstname": "Sara",
                    "lastname": "Elbana",
                    "email": "sara@sara.com",
                    "username": "sara.elbana",
                    "password": "password"

                },{
                    "firstname": "Layla",
                    "lastname": "Raafat",
                    "email": "layla@sara.com",
                    "username": "layla.raafat",
                    "password": "12345678"

                },{
                    "firstname": "Omar",
                    "lastname": "Elbana",
                    "email": "Omar@sara.com",
                    "username": "omar.elbana",
                    "password": "weakPass"

                },{
                    "firstname": "Mostafa",
                    "lastname": "Raafat",
                    "email": "mostafa@mostafa.com",
                    "phone": "01002002060",
                    "username": "Mostafa.Raafat",
                    "password": "password"

                },{
                    "firstname": "Hans",
                    "lastname": "Jan",
                    "email": "hans@hans.com",
                    "username": "hans.jan",
                    "password": "password",
                    "role":"CHEF",
                    "phone":"0640020000"

                }
                ])
            }
        }
        fetchAllrecipes();
    },[]);
    useEffect(() => {
        console.log("Recipes data set", recipes);
        setLoading(false);
    }, [recipes]);

    return(
        //
        // {/*loop to fetch all recipes and display them here in a list*/}
        <div className="recipes-list">
            <RecipesCategoriesTabsMenu/>

            <table>
                <thead className="recipes-table-head">
                <tr>
                    <th>Recipe Name</th>
                    <th> Recipe ID</th>
                </tr>
                </thead>
                <tbody className="recipes-table-body">
                {
                    loading ? (
                        <tr className="recipes-table-row">
                            <td className="employees-table-data employees-table-loading-data-cell" colSpan="6">Loading...</td>
                        </tr>
                    ):(
                        error ? (
                            <tr className="recipes-table-row">
                                <td className="recipes-table-data recipes-table-error-data-cell" colSpan="6">Error fetching data check
                                    connection...
                                </td>
                            </tr>,
                                console.log("Error fetching data", error)
                        ) : (
                            recipes.map((recipe, index) => (
                                    console.log("recipe data", recipe),
                                        <RecipesRecordsTableRow key={index} recipe={recipe} />
                                )
                            )
                        )
                    )
                }
                </tbody>
            </table>
        </div>
);
}
export default RecipesDashboard;