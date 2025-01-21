import "./MenuNavbar.css";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
import { useState } from "react";

function MenuNavbar(){
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // Additional logic for category selection can go here
    };

    return(
        <div className="menu-navbar">
            <FoodCategoryNavbar
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
                showAllRecipes={false} // This will hide the "All Recipes" option
            />
        </div>
    );
}

export default MenuNavbar;