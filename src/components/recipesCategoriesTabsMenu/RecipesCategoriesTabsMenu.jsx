import "./RecipesCategoriesTabsMenu.css";
import {useEffect, useState} from "react";
import {getCategoriesList} from "../../helpers/APIOperations.js";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";

function RecipesCategoriesTabsMenu() {
    let navigateTo = "/portal/recipe/";

    const [categoriesList, setCategoriesList] = useState()
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
    return (
        <nav>
            <ul>
                {categoriesList && categoriesList.map((category) => (
                    <FoodCategoryNavbar to={navigateTo + category.name}
                                          title={category.name}/>
                ))}
            </ul>

        </nav>
    )
}

export default RecipesCategoriesTabsMenu;