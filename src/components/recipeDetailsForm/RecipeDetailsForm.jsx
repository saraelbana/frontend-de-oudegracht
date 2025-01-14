import {useEffect, useState} from "react";

function RecipeDetailsForm(){
    const {id} = useParams();
    const [RecipeData, setRecipeData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        const fetchRecipeData = async () => {
            const response = await getResponseData(id);

            if(response[0] === 1){
                setRecipeData(response[1]);
            } else {
                console.error("Error fetching recipe data", response[1]);
            }
        };
        fetchRecipeData();
    }, [id]);

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
}