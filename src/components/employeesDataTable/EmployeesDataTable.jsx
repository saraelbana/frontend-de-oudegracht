import "./EmployeesDataTable.css";
import {useEffect, useState} from "react";
import {deoudegrachtApi, employeesEndpoint} from "../../deoudegrachtApi.js";
import EmployeesRecordsTableRow from "../employeesRecordsTableRow/EmployeesRecordsTableRow.jsx";
import Button from "../button/Button.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useNavigate} from "react-router-dom";

function EmployeesDataTable(){

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/portal/employee/new');
    };
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
                //setLoading(false);
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
                // ]);
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
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? (
                        <tr>
                            <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Loading...</td>
                        </tr>
                    ):(
                        error ? (
                            <tr>
                                <td colSpan="7" style={{textAlign: 'center', color: 'red', padding: '20px'}}>
                                    Error fetching data. Please check your connection.
                                </td>
                            </tr>
                        ) : (
                            employees.map((employee, index) => (
                                <EmployeesRecordsTableRow key={index} employee={employee} />
                            ))
                        )
                    )
                }
                </tbody>
            </table>
            <div style={{
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginTop: '15px'
            }}>
                <Button 
                    iconSrc={ADD_ICON} 
                    size="icon" 
                    onClick={handleAddClick}
                />
            </div>
        </div>
    )
}
export default EmployeesDataTable;