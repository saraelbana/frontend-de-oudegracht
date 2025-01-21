import "./AddNewRecipe.css";
import NewRecipeForm from "../newRecipeForm/NewRecipeForm.jsx";

function AddNewRecipe() {
    return (
        <div className="add-new-recipe">
            <h1>Add New Recipe</h1>
            <NewRecipeForm />
        </div>
    );
}

export default AddNewRecipe;