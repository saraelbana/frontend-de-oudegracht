import "./RecipesCategoriesTabsMenu.css";
import {NavLink} from "react-router-dom";

function RecipesCategoriesTabsMenu() {
    return (
        <nav>
            <ul className="recipes-categories-tabs-menu">
                <li>
                    <NavLink
                        to="/portal/recipe/main-dish"
                        className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Main Dish
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/recipe/salad" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Salad
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/recipe/side-dish" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Side dish
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/recipe/dessert" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Dessert
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portal/recipe/appetizer" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                        Appetizers
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default RecipesCategoriesTabsMenu;