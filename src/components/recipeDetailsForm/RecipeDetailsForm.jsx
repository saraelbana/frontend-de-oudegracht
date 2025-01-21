import "./RecipeDetailsForm.css";
import {useEffect, useState} from "react";
import {
    getCategoriesList,
    getRecipeResponseData,
    updateRecipeData
} from "../../helpers/APIOperations.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Button from "../button/Button.jsx";
import {createNewRecipeRequestData} from "../../helpers/RecipesOperations.js";

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
    const [instructions, setInstructions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const editable = searchParams.get('edit') === 'true';
        if (editable) {
            setIsEditMode(true);
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchRecipeData = async () => {
            const response = await getRecipeResponseData(id);
            if(response[0] === 1){
                setRecipeData(response[1]);
                setRecipeName(response[1].recipeName);
                setCategory(response[1].category);
                setDescription(response[1].description);
                setInstructions(response[1].instructions);
                setIngredients(response[1].ingredients);

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

    const handleBackClick = () => {
        navigate("/portal/recipe");
    }
    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };
    const handleSaveClick = async () => {
        const responseData = createNewRecipeRequestData({recipeName, category, description, ingredients, instructions});
        const updateRecipeResponse = await updateRecipeData(id, responseData);
        console.log("Update response:", updateRecipeResponse);
        if (updateRecipeResponse[0] === 1) {
            setIsEditMode(false);
        } else {
            console.error("Error updating recipe data", updateRecipeResponse[1]);
        }
    };

    if (!recipeData) {
        return <div>Loading...</div>;
    }
    return(
        <div className="main-recipe-details-form">
            <section className="recipe-details-header">
                <Button buttonName="← Back" onClick={handleBackClick}/>
                <h2>{recipeData.recipeName} </h2>
            </section>
            <section className="recipe-details-form">
                <form className="display-recipe">
                    <label id="name-label">
                        Name: {isEditMode ?
                        <input type="text" name="recipeName" defaultValue={recipeData.recipeName}
                               onChange={(event) => setRecipeName(event.target.value)}/> : recipeData.recipeName}
                    </label>
                    <label id="description-label">
                        Description: { isEditMode ?
                        <textarea id="description-field"
                                  name="description"
                                  placeholder= {recipeData.description}
                                  required
                                  onChange={(event) => setDescription(event.target.value)}
                                  maxLength="200" /*set max character to textarea 200 is the number of character that can be written in the textarea */
                        />
                        : recipeData.description}
                    </label>
                    <label id="category-label">
                        Category: {isEditMode ? (
                        <select defaultValue={recipeData.category} name="category"
                                onChange={(event) => setCategory(event.target.value)}>
                            {
                                categoriesList.map((category) => (
                                    <option key={category} value={category}> {category} </option>
                                ))
                            }
                        </select>
                    ) : recipeData.category}
                    </label>
                </form>
                <Button buttonName={isEditMode ? "Save" : "Edit Recipe"}
                        onClick={isEditMode ? handleSaveClick : handleEditClick}/>
            </section>
        </div>
    )
}

export default RecipeDetailsForm;