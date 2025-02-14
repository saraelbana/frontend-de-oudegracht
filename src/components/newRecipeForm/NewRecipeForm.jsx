import "./NewRecipeForm.css";
import { useState, useEffect } from "react";
import Button from "../button/Button.jsx";
import {
    deoudegrachtApi,
    categoriesEndpoint,
    ingredientsEndpoint, recipesEndpoint
} from "../../deoudegrachtApi.js";
import { createNewRecipeRequestData } from "../../helpers/RecipesOperations.js";
import { DEFAULT_RECIPE_CATEGORY } from "../../constants/RecipesConstants.js";
import { useNavigate } from "react-router-dom";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";

function NewRecipeForm() {
    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState(DEFAULT_RECIPE_CATEGORY);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [allAvailableIngredients, setAllAvailableIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] = useState(false);
    const [newIngredientDetails, setNewIngredientDetails] = useState({
        name: '',
        quantity: '',
        unit: ''
    });
    const [newIngredientName, setNewIngredientName] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await deoudegrachtApi.get(categoriesEndpoint);

                setCategories(response.data.allFoodCategoryTypes);
            } catch (e) {

            }
        };
        getCategories();
    }, []);
    useEffect(() => {
        const getIngredientsList = async () => {
            try {
                const response = await deoudegrachtApi.get(ingredientsEndpoint);

                setAllAvailableIngredients(response.data);
            } catch (e) {

            }
        };
        getIngredientsList();
    }, []);

    const handleAddNewInstructionClick = () => {
        setInstructions([...instructions, '']);
    };
    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instructions];
        newInstructions[index] = { instruction: value };
        setInstructions(newInstructions);
    };
    const handleRemoveInstruction = (index) => {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions);
    };
    const handleSubmit = async (e) => {
        if(recipeName && description && category ){e.preventDefault();

        const requestData = createNewRecipeRequestData({
            recipeName,
            category,
            description,
            recipeIngredients: selectedIngredients,
            instructionsSteps: instructions
        });

        try {
            const response = await deoudegrachtApi.post(recipesEndpoint, requestData);
            setSuccess(`Recipe created successfully! ID: ${response.data.id}`);
            setError("");
            navigate("/portal/recipe");
        } catch (e) {
            setError("Error creating new recipe " + e.response.data);
            setSuccess("");
        }
    }
        else {
            if (!recipeName) {
                setError("Please enter a recipe name");
            } else if (!description) {
                setError("Please enter a description");
            } else {
                setError("Please fill in all fields");
            }
        }
    };
    const handleRemoveIngredient = (ingredientToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(
            ing => ing.name !== ingredientToRemove.name
        ));
    };
    const openAddIngredientModal = () => {
        setIsAddIngredientModalOpen(true);
    };
    const closeAddIngredientModal = () => {
        setIsAddIngredientModalOpen(false);
        setNewIngredientDetails({
            name: '',
            quantity: '',
            unit: ''
        });
    };
    const handleAddIngredientSubmit = (e) => {
        e?.preventDefault();
        if (newIngredientDetails.name && newIngredientDetails.quantity && newIngredientDetails.unit) {
            const newIngredient = {
                name: newIngredientDetails.name,
                quantity: parseFloat(newIngredientDetails.quantity),
                unit: newIngredientDetails.unit
            };
            setSelectedIngredients([...selectedIngredients, newIngredient]);
            closeAddIngredientModal();
        } else {
            alert('Please fill in all ingredient details');
        }
    };
    const handleIngredientChange = (field, value) => {
        setNewIngredientDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleCreateNewIngredient = async () => {
        if (newIngredientName.trim() === '') return;
        try {
            const response = await deoudegrachtApi.post(ingredientsEndpoint, {
                name: newIngredientName.trim()
            });
            const createdIngredient = response.data;
            setAllAvailableIngredients(prev => [...prev, createdIngredient]);
            setNewIngredientName('');
        } catch (error) {
            console.error("Error creating ingredient:", error);
        }
    };
    const handleIngredientUpdate = (ingredientName, property, value) => {
        setSelectedIngredients(prevIngredients =>
            prevIngredients.map(ingredient =>
                ingredient.name === ingredientName ? { ...ingredient, [property]: value } : ingredient
            )
        );
    };
    const handleIngredientSelect = (event) => {
        const selectedIngredient = allAvailableIngredients.find(
            ingredient => ingredient.name === event.target.value
        );
        if (selectedIngredient && !selectedIngredients.some(ing => ing.name === selectedIngredient.name)) {
            setSelectedIngredients([...selectedIngredients, { ...selectedIngredient, quantity: '', unit: '' }]);
        }
    };
    const handleAddNewIngredientClick = () => {
        navigate('/portal/ingredient/new');
    };
    return (
        <div className="login-form-container">
            <form className="login-form new-recipe-form" onSubmit={handleSubmit}>
                <h2>Add New Recipe</h2>
                <div className="recipe-input">
                    <label className="recipe-label" htmlFor="recipe-name">Recipe Name</label>
                    <MandatoryTag />
                    <input
                        id="recipe-name"
                        type="text"
                        className="login-form-text-field full-width height-40 margin-0"
                        placeholder="Enter Recipe Name"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                    />
                </div>
                <div className="recipe-input">
                    <label className="recipe-label" htmlFor="recipe-description">Description</label>
                    <MandatoryTag />
                    <textarea
                        id="recipe-description"
                        className="login-form-text-field full-width min-height-100 margin-0 resize-vertical"
                        placeholder="Enter Recipe Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="recipe-input">
                    <label className="recipe-label" htmlFor="category-select">Category</label>
                    <select
                        id="category-select"
                        className="login-form-text-field full-width height-40 margin-0"
                        onChange={(event) => setCategory(event.target.value)}
                        value={category}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="recipe-input">
                    <label className="recipe-label" >Ingredients</label>
                    <div className="flex-align-center">
                        <Button type="button"
                                buttonName="Add Ingredient"
                                onClick={openAddIngredientModal}
                                textWidth={true}
                        />
                    </div>
                    {selectedIngredients.map((ingredient, index) => (
                        <div key={index} className="margin-5-0 flex-align-center">
                            <input
                                type="text"
                                value={ingredient.name}
                                readOnly
                                className="login-form-text-field full-width height-40 margin-0"
                            />
                            <Button
                                type="button"
                                buttonName="Remove"
                                textWidth={true}
                                onClick={() => handleRemoveIngredient(ingredient)}
                            />
                        </div>
                    ))}
                </div>
                {isAddIngredientModalOpen && (
                    <div className="fixed-overlay">
                        <div className="modal-content">
                            <h3>Add New Ingredient</h3>
                            <div className="recipe-input">
                                <label className="recipe-label" htmlFor="ingredient-select">Ingredient</label>
                                <select
                                    id="ingredient-select"
                                    className="login-form-text-field full-width height-40 margin-0"
                                    value={newIngredientDetails.name}
                                    onChange={(e) => handleIngredientChange('name', e.target.value)}
                                >
                                    <option value="">Select an Ingredient</option>
                                    {allAvailableIngredients.map((ingredient) => (
                                        <option key={ingredient.name} value={ingredient.name}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="new-ingredient-creation">
                                <input
                                    type="text"
                                    placeholder="Create New Ingredient"
                                    value={newIngredientName}
                                    onChange={(e) => setNewIngredientName(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    buttonName="Create"
                                    onClick={handleCreateNewIngredient}
                                />
                            </div>
                            <div className="recipe-input">
                                <label className="recipe-label" htmlFor="ingredient-quantity">Quantity</label>
                                <input
                                    id="ingredient-quantity"
                                    type="number"
                                    className="login-form-text-field full-width height-40 margin-0"
                                    value={newIngredientDetails.quantity}
                                    onChange={(e) => handleIngredientChange('quantity', e.target.value)}
                                    placeholder="Enter quantity"
                                />
                            </div>
                            <div className="recipe-input">
                                <label className="recipe-label" htmlFor="ingredient-unit">Unit</label>
                                <input
                                    id="ingredient-unit"
                                    type="text"
                                    className="login-form-text-field full-width height-40 margin-0"
                                    value={newIngredientDetails.unit}
                                    onChange={(e) => handleIngredientChange('unit', e.target.value)}
                                    placeholder="Enter unit (e.g., grams, cups)"
                                />
                            </div>
                            <div className="flex-center">
                                <Button
                                    type="button"
                                    buttonName="Cancel"
                                    onClick={closeAddIngredientModal}
                                    textWidth={true}
                                />
                                <Button
                                    type="button"
                                    buttonName="Add"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddIngredientSubmit();
                                    }}
                                    textWidth={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="recipe-input">
                    <label className="recipe-label">Instructions</label>
                    {instructions.map((instruction, index) => (
                        <div key={index} className="margin-5-0 flex-align-center">
                            <span className="margin-10">{index + 1}.</span>
                            <textarea
                                value={instruction.instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                className="login-form-text-field full-width min-height-100 margin-0 resize-vertical"
                            />
                            <Button
                                type="button"
                                buttonName="Remove"
                                onClick={() => handleRemoveInstruction(index)}
                                textWidth={true}
                            />
                        </div>
                    ))}
                    <div className="flex-align-center">
                        <Button
                            type="button"
                            buttonName="Add Instruction"
                            onClick={handleAddNewInstructionClick}
                            textWidth={true}
                        />
                    </div>
                </div>
                <br /><br />
                <div className="flex-center">
                    <Button
                        type="button"
                        buttonName="Save Recipe"
                        textWidth={true}
                        className="padding-15-40 font-bold border-radius-10"
                        disable={success}
                        onClick={handleSubmit}
                    />
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}

export default NewRecipeForm;