import "./AddMenuItem.css";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import {getCategoriesList, getRecipesList} from "../../helpers/APIOperations.js";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {createRequestData} from "../../helpers/MenuOperations.js";
import {deoudegrachtApi, menuEndpoint} from "../../deoudegrachtApi.js";

function AddMenuItem(){
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [recipesList, setRecipesList] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState([]);


    useEffect(() => {
        const fetchCategoriesList = async () => {
            const categoriesResponse = await getCategoriesList();
            if (categoriesResponse[0] === 1) {
                console.log("Categories fetched successfully:", categoriesResponse[1]);
                setCategories(categoriesResponse[1]);
                setLoading(false);
            } else {
                console.error("Error fetching categories:", categoriesResponse[1]);
                setError(categoriesResponse[1]);
                setLoading(false);
            }
        };
        fetchCategoriesList();
    }, []);
    useEffect(() => {
        const fetchRecipesList = async () => {
            const recipesResponse = await getRecipesList();
            if (recipesResponse[0] === 1) {
                console.log("Recipes fetched successfully:", recipesResponse[1]);
                setRecipesList(recipesResponse[1]);
                setLoading(false);
            } else {
                console.error("Error fetching recipes:", recipesResponse[1]);
                setError(recipesResponse[1]);
                setLoading(false);
            }
        };
        fetchRecipesList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = createRequestData({itemName, itemDescription, itemPrice, selectedCategory, selectedRecipe});
        console.log("Request data", requestData);
        try {
            console.log("Request data", requestData);
            const response = await deoudegrachtApi.post(menuEndpoint, requestData);
            setSuccess(`Menu item created successfully! ID: ${response.data.id}`);
            setError("");
        } catch (e) {
            console.error("Error creating new menu item", e);
            setError("Error creating a menu item " + e.response.data);
            setSuccess("");
        }
    }
    const handleRecipeSelect = (recipeId) => {
        setSelectedRecipe(recipeId);
    };

    return(
        <div className="add-menu-item">
            <h1>Add New Menu Item</h1>
            <form className="add-menu-item-form">
                <label htmlFor="itemName">Item Name</label>
                <input type="text" id="itemName" name="itemName" required
                       className="add-menu-item-text-field"
                       onChange={(e) => setItemName(e.target.value)}/>
                <MandatoryTag/>
                <label htmlFor="itemDescription">Item Description</label>
                <textarea id="itemDescription" name="itemDescription" required
                          className="item-description-textarea"
                          onChange={(e) => setItemDescription(e.target.value)}/>
                <MandatoryTag/>
                <label htmlFor="itemPrice">Item Price</label>
                <input type="number" id="itemPrice" name="itemPrice" required min="0" step="0.01"
                       className="item-price-text-field"
                       onChange={(e) => setItemPrice(e.target.value)}/>
                <MandatoryTag/>
                <label htmlFor="itemCategory">Item Category</label>
                {loading ? (<p> loading...</p>) : (
                    <select required id="itemCategory" name="itemCategory"
                            className="item-category-dropdown"
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>)}
                <MandatoryTag/>
                <label htmlFor="recipesList">Select Recipe</label>
                <div id="recipesList">
                    {recipesList.map((recipe) => (
                        <div key={recipe.id}>
                            <input
                                type="radio"
                                id={`recipe-${recipe.id}`}
                                name="recipes"
                                value={recipe.recipeName}
                                className="recipe-radio-button"
                                onChange={() => handleRecipeSelect(recipe.id)}
                            />
                            <label htmlFor={`recipe-${recipe.id}`}>{recipe.recipeName}</label>
                        </div>
                    ))}
                </div>
                <MandatoryTag/>
                <Button buttonName="Add Item" size="large" onClick={handleSubmit}/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default AddMenuItem;