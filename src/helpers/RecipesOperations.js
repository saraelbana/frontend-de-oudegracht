export const createNewRecipeRequestData = ({ recipeName, category, description, ingredients, instructions}) => {
    return {recipeName, category, description, ingredients, instructions};
};
export const createIngredientRequestData = ({name}) => {
    return {name};
};

