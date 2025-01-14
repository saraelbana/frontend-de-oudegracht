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
export const recipesEndpoint = DE_OUGRACHT_API_URL + "/recipes";
