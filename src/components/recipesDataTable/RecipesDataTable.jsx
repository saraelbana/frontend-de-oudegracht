import "./RecipesDataTable.css";
import { useEffect, useState } from "react";
import { deoudegrachtApi, recipesEndpoint } from "../../deoudegrachtApi.js";
import RecipesRecordsTableRow from "../recipesRecordsTableRow/RecipesRecordsTableRow.jsx";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
import { ADD_ICON } from "../../constants/AssetsFilesNames.js";
import Button from "../button/Button.jsx";
import { useNavigate } from "react-router-dom";

function RecipesDataTable() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/portal/recipe/new');
    };

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const response = await deoudegrachtApi.get(recipesEndpoint);
                console.log("Recipes data fetched", response.data);
                setRecipes(response.data);
                setFilteredRecipes(response.data); // Initialize filtered recipes with all recipes
                setLoading(false);
            } catch (e) {
                console.log("Error fetching recipes", e.data);
                setError(e);
                setLoading(false);
            }
        };
        fetchAllRecipes();
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            const filtered = recipes.filter(recipe => recipe.category === category);
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes); // Show all recipes when no category is selected
        }
    };

    return (
        <div className="recipes-data-table">
            <FoodCategoryNavbar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
            <table className="employee-table">
                <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="3" className="loading-cell">Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="3" className="error-cell">
                            Error fetching data. Please check your connection.
                        </td>
                    </tr>
                ) : (
                    filteredRecipes.map((recipe, index) => (
                        <RecipesRecordsTableRow key={index} recipe={recipe} />
                    ))
                )}
                </tbody>
            </table>
            <div className="add-button-container">
                <Button
                    iconSrc={ADD_ICON}
                    size="icon"
                    onClick={handleAddClick}
                />
            </div>
        </div>
    );
}

export default RecipesDataTable;