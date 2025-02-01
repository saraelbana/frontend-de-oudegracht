import "./NewRecipeForm.css";
import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import {
    deoudegrachtApi,
    categoriesEndpoint,
    ingredientsEndpoint, recipesEndpoint
} from "../../deoudegrachtApi.js";
import {createNewRecipeRequestData} from "../../helpers/RecipesOperations.js";
import {DEFAULT_RECIPE_CATEGORY} from "../../constants/RecipesConstants.js";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useNavigate} from "react-router-dom";
import AddNewInstruction from "../addNewInstruction/AddNewInstruction.jsx";

function NewRecipeForm(){
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
        const getCategories= async () => {
            try {
                const response = await deoudegrachtApi.get(categoriesEndpoint);
                console.log(response.data);
                setCategories(response.data.allFoodCategoryTypes);
            } catch (e) {
                console.log("Error fetching food categories", e.data);
            }
        };
        getCategories();
    }, []);
    useEffect(() => {
        const getIngredientsList= async () => {
            try {
                const response = await deoudegrachtApi.get(ingredientsEndpoint);
                console.log(response.data);
                setAllAvailableIngredients(response.data);
            } catch (e) {
                console.log("Error fetching ingredienta list", e.data);
            }
        };
        getIngredientsList();
    }, []);

    const handleAddNewIngredientClick = () => {
        navigate('/portal/ingredient/new');
    };
    const handleAddNewInstructionClick = () => {
        setInstructions([...instructions, '']);
    };
    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };
    const handleRemoveInstruction = (index) => {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = createNewRecipeRequestData({ recipeName, category, description, recipeIngredients: selectedIngredients, instructionsSteps: instructions });
        console.log(requestData);
        try {
            const response = await deoudegrachtApi.post(recipesEndpoint, requestData);
            setSuccess(`Recipe created successfully! ID: ${response.data.id}`);
            setError("");
        } catch (e) {
            setError("Error creating new recipe " + e.response.data);
            setSuccess("");
        }
    };
    const handleIngredientSelect = (event) => {
        const selectedIngredient = allAvailableIngredients.find(
            ingredient => ingredient.name === event.target.value
        );

        if (selectedIngredient && !selectedIngredients.some(ing => ing.name === selectedIngredient.name)) {
            setSelectedIngredients([...selectedIngredients, { ...selectedIngredient, quantity: '', unit: '' }]);
        }
    };
    const handleRemoveIngredient = (ingredientToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(
            ing => ing.name !== ingredientToRemove.name
        ));
    };
    const handleIngredientUpdate = (ingredientName, property, value) => {
        setSelectedIngredients(prevIngredients =>
            prevIngredients.map(ingredient =>
                ingredient.name === ingredientName ? { ...ingredient, [property]: value } : ingredient
            )
        );
    };

    const openAddIngredientModal = () => {
        setIsAddIngredientModalOpen(true);
    };

    const closeAddIngredientModal = () => {
        setIsAddIngredientModalOpen(false);
        // Reset the new ingredient details
        setNewIngredientDetails({
            name: '',
            quantity: '',
            unit: ''
        });
    };

    const handleAddIngredientSubmit = (e) => {
        // Prevent any default form submission behavior
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
            // Optional: Add error handling
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
            
            // Reset new ingredient input
            setNewIngredientName('');
        } catch (error) {
            console.error("Error creating ingredient:", error);
        }
    };

    return(
        <div className="login-form-container">
            <form className="login-form new-recipe-form" onSubmit={handleSubmit}>
                <h2>Add New Recipe</h2>
                
                <div className="recipe-input">
                    <label htmlFor="recipe-name">Recipe Name</label>
                    <input 
                        id="recipe-name"
                        type="text"
                        className="login-form-text-field"
                        placeholder="Enter Recipe Name"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            margin: '0' 
                        }}
                    />
                </div>

                <div className="recipe-input">
                    <label htmlFor="recipe-description">Description</label>
                    <textarea 
                        id="recipe-description"
                        className="login-form-text-field"
                        placeholder="Enter Recipe Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ 
                            width: '100%', 
                            minHeight: '100px', 
                            margin: '0',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <div className="recipe-input">
                    <label htmlFor="category-select">Category</label>
                    <select 
                        id="category-select"
                        className="login-form-text-field"
                        onChange={(event) => setCategory(event.target.value)}
                        value={category}
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            margin: '0' 
                        }}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="recipe-input">
                    <label>Ingredients</label>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        marginTop: '0'
                    }}>
                        <Button type="button"
                            buttonName="Add Ingredient" 
                            onClick={openAddIngredientModal}
                            textWidth={true}
                        />
                    </div>

                    {selectedIngredients.map((ingredient, index) => (
                        <div key={index} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            margin: '5px 0' 
                        }}>
                            <input 
                                type="text" 
                                value={ingredient.name} 
                                readOnly 
                                className="login-form-text-field"
                                style={{ 
                                    width: '100%', 
                                    height: '40px', 
                                    margin: '0' 
                                }}
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
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '400px'
                        }}>
                            <h3>Add New Ingredient</h3>
                            <div className="recipe-input">
                                <label htmlFor="ingredient-select">Ingredient</label>
                                <select 
                                    id="ingredient-select"
                                    className="login-form-text-field"
                                    value={newIngredientDetails.name}
                                    onChange={(e) => handleIngredientChange('name', e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        height: '40px', 
                                        margin: '0' 
                                    }}
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
                                <label htmlFor="ingredient-quantity">Quantity</label>
                                <input 
                                    id="ingredient-quantity"
                                    type="number"
                                    className="login-form-text-field"
                                    value={newIngredientDetails.quantity}
                                    onChange={(e) => handleIngredientChange('quantity', e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        height: '40px', 
                                        margin: '0' 
                                    }}
                                    placeholder="Enter quantity"
                                />
                            </div>

                            <div className="recipe-input">
                                <label htmlFor="ingredient-unit">Unit</label>
                                <input 
                                    id="ingredient-unit"
                                    type="text"
                                    className="login-form-text-field"
                                    value={newIngredientDetails.unit}
                                    onChange={(e) => handleIngredientChange('unit', e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        height: '40px', 
                                        margin: '0' 
                                    }}
                                    placeholder="Enter unit (e.g., grams, cups)"
                                />
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '20px'
                            }}>
                                <Button 
                                    buttonName="Cancel" 
                                    onClick={closeAddIngredientModal}
                                    textWidth={true}
                                />
                                <Button 
                                    buttonName="Add" 
                                    onClick={(e) => {
                                        e.preventDefault(); // Explicitly prevent form submission
                                        handleAddIngredientSubmit();
                                    }}
                                    textWidth={true}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="recipe-input">
                    <label>Instructions</label>
                    {instructions.map((instruction, index) => (
                        <div key={index} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            margin: '5px 0' 
                        }}>
                            <span style={{ marginRight: '10px' }}>{index + 1}.</span>
                            <textarea 
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                className="login-form-text-field"
                                style={{ 
                                    width: '100%', 
                                    minHeight: '100px', 
                                    margin: '0',
                                    resize: 'vertical'
                                }}
                            />
                            <Button 
                                buttonName="Remove" 
                                onClick={() => handleRemoveInstruction(index)}
                                textWidth={true}
                                style={{ 
                                    height: '40px', 
                                    padding: '0 10px', 
                                    margin: '0 0 0 10px' 
                                }}
                            />
                        </div>
                    ))}
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        marginTop: '0'
                    }}>
                        <Button 
                            buttonName="Add Instruction" 
                            onClick={handleAddNewInstructionClick}
                            textWidth={true}
                            style={{ 
                                height: '40px', 
                                padding: '0 10px', 
                                margin: '0' 
                            }}
                        />
                    </div>
                </div>

                <br /><br />
                
                <div style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginTop: '20px'
                }}>
                    <Button 
                        buttonName="Create Recipe" 
                        type="submit" 
                        textWidth={true}
                        style={{
                            padding: '15px 40px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderRadius: '10px'
                        }}
                        disabled={!recipeName || !description || !category}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default NewRecipeForm;