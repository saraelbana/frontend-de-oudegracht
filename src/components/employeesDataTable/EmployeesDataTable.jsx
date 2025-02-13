import "./EmployeesDataTable.css";
import {useContext, useEffect, useState} from "react";
import {deoudegrachtApi, employeesEndpoint} from "../../deoudegrachtApi.js";
import EmployeesRecordsTableRow from "../employeesRecordsTableRow/EmployeesRecordsTableRow.jsx";
import Button from "../button/Button.jsx";
import {ADD_ICON} from "../../constants/AssetsFilesNames.js";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext/AuthContext.jsx";

function EmployeesDataTable(){

    const {user} = useContext(AuthContext);
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

                setEmployees(response.data);
                setLoading(false);
            }
            catch (e){

                setError(e);
            }
        }
        fetchAllEmployees();
    },[]);
    useEffect(() => {

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
                            <td colSpan="7" className="loading-cell">Loading...</td>
                        </tr>
                    ):(
                        error ? (
                            <tr>
                                <td colSpan="7" className="error-cell">
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
            {
                user && user.role === "ADMIN" &&
                    (<div className="add-button-container">
                    <Button
                        iconSrc={ADD_ICON}
                        text="Add New Employee"
                        onClick={handleAddClick}
                    />
                </div>)
            }
        </div>
    )
}
export default EmployeesDataTable;