import "./Dashboard.css";
import {Route, Routes} from "react-router-dom";
import AddNewEmployee from "../../pages/staffPortal/addNewEmployee/AddNewEmployee.jsx";

function Dashboard() {
    return(
        <div className="dashboard">
            <section className="dashboard-content">
                    <h1>Dashboard</h1>
                <Routes>
                    {/*<Route path="/employees" element={<h1>Hello world</h1>}/>*/}
                    <Route path="/new-employee" element={<AddNewEmployee/>}/>
                    <Route path="/employee-details" element={<EmployeesPersonalData/>}/>
                </Routes>

            </section>
        </div>
    );
}
export default Dashboard;