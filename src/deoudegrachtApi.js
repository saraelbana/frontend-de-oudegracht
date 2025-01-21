import axios from 'axios';
const DE_OUGRACHT_API_URL = "http://localhost:8080";

export const deoudegrachtApi = axios.create({
    baseURL: DE_OUGRACHT_API_URL,
    // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
});

// employees endpoints
export const employeesEndpoint = DE_OUGRACHT_API_URL + "/employees";
//Roles endpoints
export const rolesEndpoint = DE_OUGRACHT_API_URL + "/roles";
//Recipes endpoints
export const recipesEndpoint = DE_OUGRACHT_API_URL + "/recipes";
//Categories endpoints
export const categoriesEndpoint = DE_OUGRACHT_API_URL + "/categories";
//Reservations endpoints
export const reservationsEndpoint = DE_OUGRACHT_API_URL + "/reservations";
//Ingredients endpoints
export const ingredientsEndpoint = DE_OUGRACHT_API_URL + "/ingredients";