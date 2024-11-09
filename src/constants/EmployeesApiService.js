import {deoudegrachtApi, employeesEndpoint} from "../deoudegrachtApi.js";

async function getEmployeeData() {
    try {
        const response = await deoudegrachtApi.get(employeesEndpoint);
        return response.data;
    } catch (e) {
        console.log("Error fetching profile data", e.data);
        return "Error fetching profile data";
    }
}
export default getEmployeeData;