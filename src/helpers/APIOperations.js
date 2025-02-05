import {
    categoriesEndpoint,
    deoudegrachtApi,
    employeesEndpoint,
    recipesEndpoint,
    /* reservationsEndpoint, */
    rolesEndpoint,
    ingredientsEndpoint, guestEndpoint, menuEndpoint
} from "../deoudegrachtApi.js";

//this is a flag obj. with 2 values first element a flag 0/1 second is either the successfully returned obj or the failure error

export async function getEmployeeResponseData(username) {
    try {
            const response = await deoudegrachtApi.get(`${employeesEndpoint}/${username}`);
            return [1, response.data];
        } catch (error) {
        console.error("Error fetching employee data", error);
            return [0, error];
        }
}
export async function updateEmployeeData(username, data) {
    try {
        console.log("to be updated employee data", data);
        const response = await deoudegrachtApi.put(`${employeesEndpoint}/${username}`, data);
        return [1, response.data]; // 1 indicates success
    } catch (error) {
        console.error("Error updating employee data", error);
        return [0, error]; // 0 indicates failure
    }
}
export async function getRecipeResponseData(id) {
    try {

        const response = await deoudegrachtApi.get(`${recipesEndpoint}/${id}`);
        console.log("response data from API operation file", response);

        return [1, response.data];
    } catch (error) {
        console.error("Error fetching recipe data", error);
        return [0, error];

    }
}
export async function updateRecipeData(id, data) {
    try {
        console.error("to be updated recipe data", data);
        const response = await deoudegrachtApi.put(`${recipesEndpoint}/${id}`, data);
        return [1, response.data]; // 1 indicates success
    } catch (error) {
        console.error("Error updating recipe data", error);
        return [0, error]; // 0 indicates failure
    }
}
export async function getRolesList() {
    try {
        const response = await deoudegrachtApi.get(rolesEndpoint);
        console.log(response.data.allRoles);
        return [1, response.data.allRoles];
    } catch (error) {
        console.error("Error fetching roles", error);
        return [0, error];
    }
}
export async function getCategoriesList(){
    try {
        const response = await deoudegrachtApi.get(categoriesEndpoint);
        console.log("Hello here" + response.data.allFoodCategoryTypes);
        return [1, response.data.allFoodCategoryTypes];
    } catch (error) {
        console.error("Error fetching categories", error);
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
                console.error(`Error fetching data from ${name} endpoint:`, error);
                return null;
            }
        }));

        return [1, dashboardData.filter(data => data !== null)];
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return [0, error];
    }
}
export async function getRecipesList(){
    try {
        const response = await deoudegrachtApi.get(recipesEndpoint);
        return [1, response.data];
    } catch (error) {
        console.error("Error fetching recipes", error);
        return [0, error];
    }
}
export async function deleteMenuItem(id){
    try {
        const response = await deoudegrachtApi.delete(`${menuEndpoint}/${id}`);
        return [1, response.data];
    } catch (error) {
        console.error("Error deleting menu item", error);
        return [0, error];
    }
}
export async function getGuestResponseData(username) {
    try {
        const response = await deoudegrachtApi.get(`${guestEndpoint}/${username}`);
        console.log(response.data);
        return [1, response.data];
    } catch (error) {
        console.error("Error fetching guest data", error);
        return [0, error];
    }
}
export async function getIngredientsList(){
    try {
        const response = await deoudegrachtApi.get(ingredientsEndpoint);
        return [1, response.data.allIngredients];
    } catch (error) {
        console.error("Error fetching ingredients", error);
        return [0, error];
    }
}
export async function postEmployee(requestData) {
    try {
        const response = await deoudegrachtApi.post(employeesEndpoint, requestData);
        return [1, response.data];
    } catch (error) {
        console.error("Error posting employee data", error);
        return [0, error];
    }
}
export async function postRecipeData(requestData){
    try {
        const response = await deoudegrachtApi.post(recipesEndpoint, requestData);
        return [1, response.data];
    } catch (error) {
        console.error("Error posting recipe data", error);
        return [0, error];
    }
}

