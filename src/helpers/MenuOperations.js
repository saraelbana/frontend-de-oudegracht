export const createRequestData = ({ itemName, itemDescription, itemPrice, selectedCategory, selectedRecipe}) => {
    return {

        name: itemName,
        description: itemDescription,
        price: itemPrice,
        category: selectedCategory,
        recipeId: selectedRecipe
    };
};

