import "./AddMenuItem.css";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import {getCategoriesList, getRecipesList} from "../../helpers/APIOperations.js";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {deoudegrachtApi, menuEndpoint} from "../../deoudegrachtApi.js";
import {useNavigate} from "react-router-dom";

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
    const [selectedRecipe, setSelectedRecipe] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();


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
        const formData = new FormData();
        formData.append('name', itemName);
        formData.append('description', itemDescription);
        formData.append('price', itemPrice);
        formData.append('category', selectedCategory || "");
        formData.append('recipeId', selectedRecipe || "");
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await deoudegrachtApi.post(menuEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess(`Menu item created successfully! ID: ${response.data.id}`);
            setError("");
            navigate("/portal/menu");
        } catch (e) {

            setError("Error creating a menu item " + e.response.data);
            setSuccess("");
        }
    }
    const handleRecipeSelect = (recipeId) => {
        setSelectedRecipe(recipeId);
    };
    function handleImageSelect(e) {
        const file = e;
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.type)) {
                setError("Selected file is not a valid image. Please select a JPEG, PNG, or GIF file.");
                setSelectedImage(null);
                return;
            }

            if (file.size > maxSizeInBytes) {
                setError("Selected file is too large. Please select an image smaller than 5 MB.");
                setSelectedImage(null);
                return;
            }

            setError("");
            setSelectedImage(file);
        }
    }

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
                    <label htmlFor="itemImage">Item Image</label>
                </div>
                <input type="file" 
                       id="itemImage" 
                       name="itemImage" 
                       accept="image/*"
                       className="item-image-input"
                       onChange={(e) => handleImageSelect(e.target.files[0])}/>

                <div className="form-field-label">
                    <label htmlFor="itemCategory">Item Category</label>
                    <MandatoryTag/>
                </div>
                {loading ? (<p> loading...</p>) : (
                    <select 
                            required 
                            id="itemCategory" 
                            name="itemCategory"
                            className="item-category-dropdown"
                            value={selectedCategory || ""}
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled>
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
                        <option value="" disabled>
                            Select recipe
                        </option>
                        {recipesList.map((recipe, index) => (
                            <option key={index} value={recipe.id}>
                                {recipe.recipeName}
                            </option>
                        ))}
                    </select>
                )}
                <Button
                    type="button"
                    text="Add Menu Item"
                    onClick={handleSubmit}
                    className="submit-add-menu-item-button"
                    disable={!(itemName && itemDescription && itemPrice && selectedCategory && selectedRecipe)}/>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default AddMenuItem;