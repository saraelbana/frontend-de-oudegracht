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
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
                setAvailableIngredients(response.data);
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
        const requestData = createNewRecipeRequestData({ recipeName, category, description, ingredients: selectedIngredients, instructions});
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
        const selectedIngredient = availableIngredients.find(
            ingredient => ingredient.name === event.target.value
        );

        if (selectedIngredient && !selectedIngredients.some(ing => ing.name === selectedIngredient.name)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient]);
        }
    };
    const handleRemoveIngredient = (ingredientToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(
            ing => ing.name !== ingredientToRemove.name
        ));
    };

    return(
        <form className="new-recipe-form" onSubmit={handleSubmit}>
            <div className="new-recipe-name">
                <label id="recipe-name-label">
                    Recipe Name:
                    <input type='text'
                           id="recipe-name-field"
                           name="recipeName"
                           placeholder="Recipe Name"
                           required
                           onChange={(event) => setRecipeName(event.target.value)}
                    />
                </label>
                <MandatoryTag/>
            </div>
            <div className="new-recipe-description">
                <label id="description-label">
                    Description:
                    <textarea id="description-field"
                              name="description"
                              placeholder="Description"
                              required
                              onChange={(event) => setDescription(event.target.value)}
                              maxLength="200" /*set max character to textarea 200 is the number of character that can be written in the textarea */
                    />
                </label>
                <MandatoryTag restrictionMessage="Max characters is 200 "/>
            </div>
            <div className="new-recipe-category">
                <label id="category-label">
                    category:
                    <select id="category-field" name="category" onChange={(event) => setCategory(event.target.value)}>
                        {
                            categories.map((category) => (
                                <option key={category} value={category}>{category}</option>))
                        }
                    </select>
                </label>
            </div>
            <div className="new-recipe-ingredients">
                <label id="ingredients-label">
                    Ingredients:
                    <select
                        id="ingredient-field"
                        name="ingredient"
                        onChange={handleIngredientSelect}
                        value="" // Reset selection after each pick
                    >
                        <option value="">Select an ingredient</option>
                        {availableIngredients.map((ingredient) => (
                            <option key={ingredient.name} value={ingredient.name}>
                                {ingredient.name}
                            </option>
                        ))}
                    </select>
                    <Button iconSrc={ADD_ICON} size="icon" onClick={handleAddNewIngredientClick}/>
                </label>
                <div className="selected-ingredients">
                    {selectedIngredients.map((ingredient) => (
                        <div key={ingredient.name} className="selected-ingredient">
                            <span>{ingredient.name} </span>
                            <Button
                                text="✕"
                                onClick={() => handleRemoveIngredient(ingredient)}
                                size="icon"
                                className="remove-ingredient"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="instructions-section">
                <label>Instructions steps: </label>
                {instructions.map((instruction, index) => (
                    <AddNewInstruction
                        key={index}
                        index={index}
                        instruction={instruction}
                        onChange={handleInstructionChange}
                        onRemove={handleRemoveInstruction}
                    />
                ))}
                <Button iconSrc={ADD_ICON} size="icon" onClick={handleAddNewInstructionClick}/>
            </div>
            <Button buttonName="Submit" disable={!(recipeName)}/>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </form>
    );
}

export default NewRecipeForm;