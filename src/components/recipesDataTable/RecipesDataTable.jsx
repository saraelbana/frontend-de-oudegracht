import "./RecipesDataTable.css";
import {useEffect, useState} from "react";
import {deoudegrachtApi, recipesEndpoint} from "../../deoudegrachtApi.js";
import RecipesRecordsTableRow from "../recipesRecordsTableRow/RecipesRecordsTableRow.jsx";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";

function RecipesDataTable(){
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/portal/recipe/new');
    };
    useEffect(()=>{
        const fetchAllRecipes = async ()=>{
            try {
                const response = await deoudegrachtApi.get(recipesEndpoint);
                console.log("Recipes data fetched", response.data);
                setRecipes(response.data);
                setFilteredRecipes(response.data); // Initialize filtered recipes with all recipes
                setLoading(false);
            }
            catch (e){
                console.log("Error fetching recipes", e.data);
                setError(e);
                setLoading(false);
                // Your test data here...
            }
        }
        fetchAllRecipes();
    },[]);
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            const filtered = recipes.filter(recipe => recipe.category === category);
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes); // Show all recipes when no category is selected
        }
    };

    return(
        <div className="recipes-data-table">
            <FoodCategoryNavbar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory}/>
            <table className="recipes-table">
                <thead className="recipes-table-head">
                <tr className="recipes-table-head-row">
                    <th className="recipes-name-table-head">Recipe Name</th>
                    <th className="recipes-category-table-head">Category</th>
                    <th className="recipes-edit-table-head">Edit</th>
                </tr>
                </thead>
                <tbody className="recipes-table-body">
                {
                    loading ? (
                            <tr className="recipes-table-row">
                                <td className="recipes-table-data recipes-table-loading-data-cell" colSpan="6">Loading...</td>
                            </tr>
                        ):
                        error ? (
                            <tr className="recipes-table-row">
                                <td className="recipes-table-data recipes-table-error-data-cell" colSpan="6">Error fetching data check
                                    connection...</td>
                            </tr>
                        ) : (
                            filteredRecipes.map((recipe, index) => (
                                <RecipesRecordsTableRow key={index} recipe={recipe} />
                            ))
                        )
                }
                </tbody>
            </table>
            <Button iconSrc = {ADD_ICON} size = "icon" onClick ={handleAddClick}/>
        </div>
    );
}
export default RecipesDataTable;