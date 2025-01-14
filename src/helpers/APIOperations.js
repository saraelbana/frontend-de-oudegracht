import {categoriesEndpoint, deoudegrachtApi, employeesEndpoint, rolesEndpoint} from "../deoudegrachtApi.js";

//this is a flag obj. with 2 values first element a flag 0/1 second is either the successfully returned obj or the failure error

export async function getResponseData(username) {
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
        const response = await deoudegrachtApi.put(`${employeesEndpoint}/${username}`, data);
        return [1, response.data]; // 1 indicates success
    } catch (error) {
        console.error("Error updating employee data", error);
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
        console.log(response.data.allCategories);
        return [1, response.data.allCategories];
    } catch (error) {
        console.error("Error fetching categories", error);
        return [0, error];
    }
}