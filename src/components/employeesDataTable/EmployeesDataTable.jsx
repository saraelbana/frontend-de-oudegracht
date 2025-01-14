import "./EmployeesDataTable.css";
import {useEffect, useState} from "react";
import {deoudegrachtApi, employeesEndpoint} from "../../deoudegrachtApi.js";
import EmployeesRecordsTableRow from "../employeesRecordsTableRow/EmployeesRecordsTableRow.jsx";

function EmployeesDataTable(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchAllEmployees = async ()=>{
            try {
                const response = await deoudegrachtApi.get(employeesEndpoint);
                console.log("Employees data fetched", response.data);
                setEmployees(response.data);
                setLoading(false);
            }
            catch (e){

                console.log("Error fetching employees", e.data);
                setLoading(false);
                setError(e);
                // this fragment is commented out for testing purposes
                // setEmployees([{
                //     "firstname": "Sara",
                //     "lastname": "Elbana",
                //     "email": "sara@sara.com",
                //     "username": "sara.elbana",
                //     "password": "password"
                //
                // },{
                //     "firstname": "Layla",
                //     "lastname": "Raafat",
                //     "email": "layla@sara.com",
                //     "username": "layla.raafat",
                //     "password": "12345678"
                //
                // },{
                //     "firstname": "Omar",
                //     "lastname": "Elbana",
                //     "email": "Omar@sara.com",
                //     "username": "omar.elbana",
                //     "password": "weakPass"
                //
                // },{
                //     "firstname": "Mostafa",
                //     "lastname": "Raafat",
                //     "email": "mostafa@mostafa.com",
                //     "phone": "01002002060",
                //     "username": "Mostafa.Raafat",
                //     "password": "password"
                //
                // },{
                //     "firstname": "Hans",
                //     "lastname": "Jan",
                //     "email": "hans@hans.com",
                //     "username": "hans.jan",
                //     "password": "password",
                //     "role":"CHEF",
                //     "phone":"0640020000"
                //
                // }
                // ])
            }
        }
        fetchAllEmployees();
    },[]);
    useEffect(() => {
        console.log("Employees data set", employees);
        setLoading(false);
    }, [employees]);

    return(
        <div className="employees-data-table">
            <table  className="employees-table">
                <thead className="employees-table-head">
                    <tr className="employees-table-row">
                        <th className="employees-table-head employees-table-head-firstname">Firstname</th>
                        <th className="employees-table-head employees-table-head-lastname">Lastname</th>
                        <th className="employees-table-head employees-table-head-email">Email</th>
                        <th className="employees-table-head employees-table-head-phone">Phone Number</th>
                        <th className="employees-table-head employees-table-head-username">Username</th>
                        <th className="employees-table-head employees-table-head-role">Role</th>
                    </tr>
                </thead>
                <tbody className="employees-table-body">
                {
                    loading ? (
                        <tr className="employees-table-row">
                            <td className="employees-table-data employees-table-loading-data-cell" colSpan="6">Loading...</td>
                        </tr>
                    ):(
                        error ? (
                            <tr className="employees-table-row">
                                <td className="employees-table-data employees-table-error-data-cell" colSpan="6">Error fetching data check
                                    connection...
                                </td>
                            </tr>,
                                console.log("Error fetching data", error)
                        ) : (
                            employees.map((employee, index) => (
                                            console.log("Employee data", employee),
                                                <EmployeesRecordsTableRow key={index} employee={employee} />
                                    )
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