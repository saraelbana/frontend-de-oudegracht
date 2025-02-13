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

                setCategories(categoriesResponse[1]);
                setLoading(false);
            } else {

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

                setRecipesList(recipesResponse[1]);
                setLoading(false);
            } else {

                setError(recipesResponse[1]);
                setLoading(false);
            }
        };
        fetchRecipesList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = createRequestData({itemName, itemDescription, itemPrice, selectedCategory, selectedRecipe});

        try {

            const response = await deoudegrachtApi.post(menuEndpoint, requestData);
            setSuccess(`Menu item created successfully! ID: ${response.data.id}`);
            setError("");
            window.location.reload();
        } catch (e) {

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
                <div className="form-field-label">
                    <label htmlFor="itemName">Item Name</label>
                    <MandatoryTag/>
                </div>
                <input type="text" id="itemName" name="itemName" required
                       className="add-menu-item-text-field"
                       onChange={(e) => setItemName(e.target.value)}/>

                <div className="form-field-label">
                    <label htmlFor="itemDescription">Item Description</label>
                    <MandatoryTag/>
                </div>
                <textarea id="itemDescription" name="itemDescription" required
                          className="item-description-textarea"
                          onChange={(e) => setItemDescription(e.target.value)}/>

                <div className="form-field-label">
                    <label htmlFor="itemPrice">Item Price</label>
                    <MandatoryTag/>
                </div>
                <input type="number" id="itemPrice" name="itemPrice" required min="0" step="0.01"
                       className="item-price-text-field"
                       onChange={(e) => setItemPrice(e.target.value)}/>

                <div className="form-field-label">
                    <label htmlFor="itemCategory">Item Category</label>
                    <MandatoryTag/>
                </div>
                {loading ? (<p> loading...</p>) : (
                    <select required id="itemCategory" name="itemCategory"
                            className="item-category-dropdown"
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled selected>
                            select category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>)}

                <div className="form-field-label">
                    <label htmlFor="recipesList">Select Recipe</label>
                    <MandatoryTag/>
                </div>
                {loading ? (<p>Loading...</p>) : (
                    <select
                        required
                        id="recipesList"
                        name="recipesList"
                        className="item-category-dropdown"
                        onChange={(e) => handleRecipeSelect(e.target.value)}
                        value={selectedRecipe}
                    >
                        <option value="" disabled selected>
                            Select recipe
                        </option>
                        {recipesList.map((recipe, index) => (
                            <option key={index} value={recipe.id}>
                                {recipe.recipeName}
                            </option>
                        ))}
                    </select>
                )}
                <Button type="submit" text="Add Menu Item" onClick={handleSubmit} className="submit-add-menu-item-button"/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default AddMenuItem;