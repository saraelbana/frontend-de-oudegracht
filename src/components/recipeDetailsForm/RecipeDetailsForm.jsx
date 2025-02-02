import "./RecipeDetailsForm.css";
import {useEffect, useState} from "react";
import {
    getCategoriesList,
    getRecipeResponseData,
    updateRecipeData
} from "../../helpers/APIOperations.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Button from "../button/Button.jsx";
import {deoudegrachtApi, ingredientsEndpoint} from "../../deoudegrachtApi.js";

function RecipeDetailsForm(){
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const [recipeData, setRecipeData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [recipeName, setRecipeName] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const editable = searchParams.get('edit') === 'true';
        if (editable) {
            setIsEditMode(true);
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchRecipeData = async () => {
            const response = await getRecipeResponseData(id);
            console.log(response);
            if(response[0] === 1){
                setRecipeData(response[1]);
                setRecipeName(response[1].recipeName);
                setCategory(response[1].category);
                setDescription(response[1].description);
                setInstructions(response[1].instructionSteps);
                setIngredients(response[1].recipeIngredients);

            } else {
                console.error("Error fetching recipe data", response[1]);
            }
        };
        fetchRecipeData();
    }, [id]);
    useEffect(() => {
        const fetchCategoriesList = async () => {
            const categoriesListResponse = await getCategoriesList();
            if(categoriesListResponse[0] === 0){
                console.error("Error fetching categories", categoriesListResponse[1]);
            } else {
                setCategoriesList(categoriesListResponse[1]);
            }
        };
        fetchCategoriesList();
    }, []);
    useEffect(() => {
        const getIngredientsList= async () => {
            try {
                const response = await deoudegrachtApi.get(ingredientsEndpoint);
                console.log(response.data);
                setAllIngredients(response.data);
            } catch (e) {
                console.log("Error fetching ingredienta list", e.data);
            }
        };
        getIngredientsList();
    }, []);

    const handleBackClick = () => {
        navigate("/portal/recipe");
    }
    const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditMode(true);
    };
    const handleSaveClick = async () => {
        const requestIngredients = recipeData.recipeIngredients.map(ingredient => {
            const selectedIngredient = selectedIngredients.find(ing => ing.name === ingredient.name);
            return selectedIngredient ? selectedIngredient : ingredient;
        }).concat(
            selectedIngredients.filter(ing => !recipeData.recipeIngredients.some(ingredient => ingredient.name === ing.name))
        );
        const requestData = {
            recipeName,
            description,
            category,
            recipeIngredients: requestIngredients,
            instructionsSteps: instructions
        };
        console.log(requestData);

        const updateRecipeResponse = await updateRecipeData(id, requestData);
        // try {
        //     console.error("to be updated recipe data", requestData);
        //     const updateRecipeResponse = await deoudegrachtApi.put(`${recipesEndpoint}/${id}`, requestData);
        //     setIsEditMode(false);
        //     setSuccess(`Recipe edited successfully! ID: ${updateRecipeResponse.data.id}`);
        //     setError("");
        // } catch (error) {
        //     console.error("Error updating recipe data", error);
        //     setError("Error editing recipe " + updateRecipeResponse.data);
        //     setSuccess("");
        // }
        if (updateRecipeResponse[0] === 1) {
            setIsEditMode(false);
            setSuccess(`Recipe edited successfully! ID: ${updateRecipeResponse.data.id}`);
            setError("");
        } else {
            setError("Error editing recipe " + updateRecipeResponse.data);
            setSuccess("");
            console.error("Error updating recipe data", updateRecipeResponse[1]);
        }
    };
    const handleIngredientSelect = (event) => {
        const selectedName = event.target.value;
        if (!selectedName) return;

        const alreadySelected = selectedIngredients.some(ing => ing.name === selectedName);

        if (!alreadySelected) {
            setSelectedIngredients([...selectedIngredients, {
                name: selectedName,
                quantity: '',
                unit: ''
            }]);
        }
    };
    const handleIngredientUpdate = (ingredientName, field, value) => {
        setSelectedIngredients(prevIngredients =>
            prevIngredients.map(ing =>
                ing.name === ingredientName
                    ? { ...ing, [field]: field === 'quantity' ? Number(value) : value }
                    : ing
            )
        );
    };
    const handleRemoveIngredient = (ingredientName, e) => {
        e.preventDefault(); // Prevent form submission
        setSelectedIngredients(selectedIngredients.filter(
            ing => ing.name !== ingredientName
        ));
    };
    const handleAddNewIngredientClick = () => {
        navigate('/portal/ingredient/new');
    };
    const handleInstructionChange = (index, value) => {
        setInstructions(prevInstructions =>
            prevInstructions.map((instruction, i) =>
                i === index ? value : instruction
            )
        );
    };
    const handleRemoveInstruction = (index) => {
        setInstructions(prevInstructions =>
            prevInstructions.filter((_, i) => i !== index)
        );
    };

    if (!recipeData) {
        return <div>Loading...</div>;
    }

    return(
        <div className="login-form-container">
            <form className="login-form recipe-details-form" onSubmit={handleSaveClick}>
                <div className="recipe-details-header">
                    <Button 
                        buttonName="← Back" 
                        onClick={handleBackClick} 
                        className="back-button"
                    />
                    <h2>{recipeData.recipeName}</h2>
                </div>
                <div>
                    <label htmlFor="name-field">Recipe Name</label>
                    <input 
                        type="text" 
                        id="name-field" 
                        name="recipeName" 
                        className="login-form-text-field"
                        value={recipeName}
                        placeholder="Enter recipe name*"
                        onChange={(event) => setRecipeName(event.target.value)}
                        disabled={!isEditMode}
                    />
                </div>
                <div>
                    <label htmlFor="description-field">Description</label>
                    <textarea 
                        id="description-field"
                        name="description"
                        className="login-form-text-field"
                        placeholder="Enter recipe description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        maxLength="200"
                        disabled={!isEditMode}
                    />
                </div>
                <div>
                    <label htmlFor="category-field">Category</label>
                    <select
                        id="category-field"
                        name="category"
                        className="login-form-text-field"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        disabled={!isEditMode}
                    >
                        <option disabled selected>select category</option>
                        {categoriesList.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {isEditMode && (
                    <div>
                        <label>Ingredients</label>
                        <select 
                            className="login-form-text-field"
                            onChange={handleIngredientSelect}
                        >
                            <option value="">Select Ingredient</option>
                            {allIngredients.map((ingredient) => (
                                <option key={ingredient.name} value={ingredient.name}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </select>
                        <Button 
                            buttonName="Add New Ingredient" 
                            onClick={handleAddNewIngredientClick}
                            className="submit-login-button"
                        />
                    </div>
                )}

                {isEditMode ? (
                    selectedIngredients.map((ingredient) => (
                    <div key={ingredient.name} className="ingredient-input">
                        <input 
                            type="text" 
                            value={ingredient.name} 
                            readOnly 
                            className="login-form-text-field"
                        />
                        <input 
                            type="number" 
                            placeholder="Quantity" 
                            value={ingredient.quantity || ''}
                            onChange={(e) => handleIngredientUpdate(
                                ingredient.name, 
                                'quantity', 
                                e.target.value
                            )}
                            className="login-form-text-field"
                        />
                        <input 
                            type="text" 
                            placeholder="Unit" 
                            value={ingredient.unit || ''}
                            onChange={(e) => handleIngredientUpdate(
                                ingredient.name, 
                                'unit', 
                                e.target.value
                            )}
                            className="login-form-text-field"
                        />
                        <Button 
                            buttonName="Remove" 
                            onClick={(e) => handleRemoveIngredient(ingredient.name, e)}
                            className="submit-login-button"
                        />
                    </div>
                    )
                )): (<div>
                    <label>Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-input">
                            <p>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>
                        </div>
                    ))}
                </div>)}

                {

                    <div className="instructions-container">
                        <label>Instructions</label>
                        {instructions.map((instruction, index) => (
                            <div key={index} className="instruction-input">
                                <label>Step {index + 1}</label>
                                <textarea
                                    value={instruction.instruction}
                                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                                    className="login-form-text-field"
                                    placeholder={`Step ${index + 1}`}
                                    disabled={!isEditMode}
                                />
                                {
                                    isEditMode && (
                                        <Button
                                            buttonName="Remove"
                                            onClick={() => handleRemoveInstruction(index)}
                                            className="submit-login-button"
                                        />)
                                }
                            </div>
                        ))}
                    </div>
                }

                {isEditMode ? (
                    <Button
                        buttonName="Save" 
                        className="submit-login-button"
                        onClick={handleSaveClick}
                    />
                ):(
                    <Button
                        buttonName="Edit" 
                        className="submit-login-button"
                        onClick={handleEditClick}
                    />
                )}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default RecipeDetailsForm;