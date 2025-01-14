import "./RecipesDataTable.css";
import {useEffect, useState} from "react";
import {deoudegrachtApi, recipesEndpoint} from "../../deoudegrachtApi.js";
import RecipesRecordsTableRow from "../recipesRecordsTableRow/RecipesRecordsTableRow.jsx";

function RecipesDataTable(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchAllRecipes = async ()=>{
            try {
                const response = await deoudegrachtApi.get(recipesEndpoint);
                console.log("REcipess data fetched", response.data);
                setRecipes(response.data);
                setLoading(false);
            }
            catch (e){
                console.log("Error fetching recipes", e.data);
                setLoading(false);
                setError(e);
                // this fragment is commented out for testing purposes
                // setRecipes([{
                //  "recipeName": "Lamb Kofta",
                //  "description": "Middle Eastern spiced lamb meatballs",
                //  "category": "MainCourse",
                //  "recipeIngredients": [
                //   {
                //     "name": "Ground lamb",
                //     "quantity": 500,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Onion",
                //     "quantity": 100,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Parsley",
                //     "quantity": 30,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Cumin",
                //     "quantity": 10,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Salt",
                //     "quantity": 5,
                //     "unit": "grams"
                //   }
                //  ]
                // },{
                //  "recipeName": "Grilled Chicken Biryani",
                //  "description": "Aromatic basmati rice with marinated grilled chicken and spices",
                //  "category": "MainCourse",
                //  "recipeIngredients": [
                //   {
                //     "name": "Basmati rice",
                //     "quantity": 500,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Chicken",
                //     "quantity": 400,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Yogurt",
                //     "quantity": 200,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Onions",
                //     "quantity": 150,
                //     "unit": "grams"
                //   },
                //   {
                //     "name": "Mixed spices",
                //     "quantity": 30,
                //     "unit": "grams"
                //   }
                //  ]
                // })
            }
        }
        fetchAllRecipes();
    },[]);
    useEffect(() => {
        console.log("Recipes data set", recipes);
        setLoading(false);
    }, [recipes]);

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
                {
                    loading ? (
                        <tr className="recipes-table-row">
                            <td className="recipes-table-data recipes-table-loading-data-cell" colSpan="6">Loading...</td>
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
                {/*<RecipeTableRow recipe={}/>*/}
                </tbody>
            </table>
        </div>
    );
}
export default RecipesDataTable;