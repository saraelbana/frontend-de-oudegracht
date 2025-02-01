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
export const guestEndpoint = DE_OUGRACHT_API_URL + "/guests";
export const registerEndpoint = DE_OUGRACHT_API_URL + "/auth/register";
export const menuEndpoint = DE_OUGRACHT_API_URL + "/menu-items";

deoudegrachtApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);