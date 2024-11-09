import "./EmployeesDataTable.css";
import {useEffect, useState} from "react";
import {deoudegrachtApi, employeesEndpoint} from "../../deoudegrachtApi.js";
import EmployeeRecordTableRow from "../employeeRecordTableRow/EmployeeRecordTableRow.jsx";

function EmployeesDataTable(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchEAllEmployees = async ()=>{
            try {
                const response = await deoudegrachtApi.get(employeesEndpoint);
                console.log("Employees data fetched", response.data);
                setEmployees(response.data);
                setLoading(false);
            }
            catch (e){
                console.log("Error fetching employees", e.data);
                setLoading(false);
            }
        }
        fetchEAllEmployees();
    },[]);
    useEffect(() => {
        console.log("Employees data set", employees);
        setLoading(false);
    }, [employees]);

    return(
        <div className="employees-data-table">
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ):(
                        employees.map(
                            (employee, index) => (
                                console.log("Employee data", employee),
                                <EmployeeRecordTableRow key={index} employee={employee} />
                            )
                        )
                    )
                }
                </tbody>
            </table>

        </div>
    )
}
export default EmployeesDataTable;