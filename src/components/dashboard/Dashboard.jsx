import "./Dashboard.css";
import {Route, Routes} from "react-router-dom";
import AddNewEmployee from "../../pages/staffPortal/addNewEmployee/AddNewEmployee.jsx";
import EmployeesDataTable from "../employeesDataTable/EmployeesDataTable.jsx";

function Dashboard() {
    return(
        <div className="dashboard">
            <section className="dashboard-content">
                    <h1>Dashboard</h1>
                <Routes>
                    <Route path="/employees-Details" element={<EmployeesDataTable/>}/>
                    <Route path="/new-employee" element={<AddNewEmployee/>}/>
                </Routes>

            </section>
        </div>
    );
}
export default Dashboard;