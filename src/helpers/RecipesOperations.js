export const createNewRecipeRequestData = ({ recipeName, category, description, recipeIngredients, instructionsSteps}) => {
    return {recipeName, category, description, recipeIngredients, instructionsSteps};
};
export const createIngredientRequestData = ({name}) => {
    return {name};
};

