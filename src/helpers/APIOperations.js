import {
    categoriesEndpoint,
    deoudegrachtApi,
    employeesEndpoint,
    recipesEndpoint,
    rolesEndpoint,
    guestEndpoint,
    menuEndpoint
} from "../deoudegrachtApi.js";

//this is a flag obj. with 2 values first element a flag 0/1 second is either the successfully returned obj or the failure error

export async function getEmployeeResponseData(username) {
    try {
            const response = await deoudegrachtApi.get(`${employeesEndpoint}/${username}`);
            return [1, response.data];
        } catch (error) {
            return [0, error];
        }
}
export async function getRecipeResponseData(id) {
    try {

        const response = await deoudegrachtApi.get(`${recipesEndpoint}/${id}`);


        return [1, response.data];
    } catch (error) {

        return [0, error];

    }
}
export async function updateRecipeData(id, data) {
    try {
        const response = await deoudegrachtApi.put(`${recipesEndpoint}/${id}`, data);
        return [1, response.data]; // 1 indicates success
    } catch (error) {

        return [0, error]; // 0 indicates failure
    }
}
export async function getRolesList() {
    try {
        const response = await deoudegrachtApi.get(rolesEndpoint);

        return [1, response.data.allRoles];
    } catch (error) {

        return [0, error];
    }
}
export async function getCategoriesList(){
    try {
        const response = await deoudegrachtApi.get(categoriesEndpoint);

        return [1, response.data.allFoodCategoryTypes];
    } catch (error) {

        return [0, error];
    }
}
export async function getDashboardData() {
    try {
        const endpoints = [
            { name: "employees", endpoint: employeesEndpoint },
            { name: "recipes", endpoint: recipesEndpoint },
            { name: "menu-items", endpoint: menuEndpoint },
            { name: "guests", endpoint: guestEndpoint }
        ];

        const dashboardData = await Promise.all(endpoints.map(async ({ name, endpoint }) => {
            try {
                const response = await deoudegrachtApi.get(endpoint);
                return { name, totalNumber: response.data.length };
            } catch (error) {

                return null;
            }
        }));

        return [1, dashboardData.filter(data => data !== null)];
    } catch (error) {
        return [0, error];
    }
}
export async function getRecipesList(){
    try {
        const response = await deoudegrachtApi.get(recipesEndpoint);
        return [1, response.data];
    } catch (error) {
        return [0, error];
    }
}
export async function deleteMenuItem(id){
    try {
        const response = await deoudegrachtApi.delete(`${menuEndpoint}/${id}`);
        return [1, response.data];
    } catch (error) {
        return [0, error];
    }
}
export async function deleteRecipe(id){
    try {
        const response = await deoudegrachtApi.delete(`${recipesEndpoint}/${id}`);
        return [1, response.data];
    } catch (error) {
        return [0, error];
    }
}
export async function deleteEmployee(username){
    try {
        const response = await deoudegrachtApi.delete(`${employeesEndpoint}/${username}`);
        return [1, response.data];
    } catch (error) {
        return [0, error];
    }
}