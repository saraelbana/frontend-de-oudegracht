import "./FoodCategoryNavbar.css";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCategoriesList} from "../../helpers/APIOperations.js";

function FoodCategoryNavbar({ onCategorySelect, selectedCategory, showAllRecipes = true }){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategoriesList = async () => {
            const categoriesResponse = await getCategoriesList();
            if (categoriesResponse[0] === 1) {
                console.log("Categories fetched successfully:", categoriesResponse[1]);
                setCategories(categoriesResponse[1]);
                setLoading(false);
            } else {
                console.error("Error fetching categories:", categoriesResponse[1]);
                setError(categoriesResponse[1]);
                setLoading(false);
            }
        };
        fetchCategoriesList();
    }, []);
    const handleCategoryClick = (category, event) => {
        event.preventDefault();
        onCategorySelect(category === selectedCategory ? null : category);
    };

    return(
        <nav className="food-category-navbar">
            <ul className="category-list">
                {loading ? (
                    <li>Loading categories...</li>
                ) : error ? (
                    <li>Error loading categories</li>
                ) : (
                    <>
                        {showAllRecipes && (
                            <li>
                                <NavLink
                                    to="/portal/recipe/"
                                    className={selectedCategory === null ? 'active-menu-link' : 'default-menu-link'}
                                    onClick={(e) => handleCategoryClick(null, e)}
                                >
                                    All Recipes
                                </NavLink>
                            </li>
                        )}
                        {categories.map((category, index) => (
                            <li key={index}>
                                <NavLink
                                    to="/portal/recipe/"
                                    className={selectedCategory === category ? 'active-menu-link' : 'default-menu-link'}
                                    onClick={(e) => handleCategoryClick(category, e)}
                                >
                                    {category}
                                </NavLink>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </nav>
    );
}

export default FoodCategoryNavbar;