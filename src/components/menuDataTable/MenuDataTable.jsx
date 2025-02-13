import "./MenuDataTable.css";
import MenuItemRecordRow from "../menuItemRecordRow/MenuItemRecordRow.jsx";
import {useEffect, useState} from "react";
import {deoudegrachtApi, menuEndpoint} from "../../deoudegrachtApi.js";
import FoodCategoryNavbar from "../foodCategoryNavbar/FoodCategoryNavbar.jsx";
function MenuDataTable(){
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            const filtered = menu.filter(item => item.category === category);
            setFilteredMenu(filtered);
        } else {
            setFilteredMenu(menu); // Show all items when no category is selected
        }
    };
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await deoudegrachtApi.get(menuEndpoint);

                setMenu(response.data);
                setFilteredMenu(response.data);
                setLoading(false);
            } catch (e) {

                setError(e);
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    return(
        <div className="menu-data-table">
            <FoodCategoryNavbar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
            <table>
                <thead>
                    <tr>
                        <th>Menu Item</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ?(
                        <tr>
                        <td>Loading...</td>
                    </tr>
                ) : error ?(
                    <tr>
                        <td>
                            Error fetching data. Please check your connection.
                        </td>
                    </tr>
                ):(
                        filteredMenu.map((item, index) => (
                            <MenuItemRecordRow key={index} item={item}/>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
export default MenuDataTable;