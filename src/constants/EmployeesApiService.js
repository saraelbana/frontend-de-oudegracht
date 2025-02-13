import {deoudegrachtApi, employeesEndpoint} from "../deoudegrachtApi.js";

async function getEmployeeData() {
    try {
        const response = await deoudegrachtApi.get(employeesEndpoint);
        return response.data;
    } catch (e) {

        return "Error fetching profile data";
    }
}
export default getEmployeeData;