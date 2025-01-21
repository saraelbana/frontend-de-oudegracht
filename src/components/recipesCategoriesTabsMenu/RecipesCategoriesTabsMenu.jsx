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

            {/*<ul className="recipes-categories-tabs-menu">*/}
            {/*    <li>*/}
            {/*        <NavLink*/}
            {/*            to= {navigateTo + "main-dish"}*/}
            {/*            className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
            {/*            Main Dish*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <NavLink to="/portal/recipe/salad" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
            {/*                Salad*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <NavLink to="/portal/recipe/side-dish" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
            {/*            Side dish*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <NavLink to="/portal/recipe/dessert" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
            {/*            Dessert*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <NavLink to="/portal/recipe/appetizer" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
            {/*            Appetizers*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </nav>
    )
}

export default RecipesCategoriesTabsMenu;