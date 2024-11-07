import "./EmployeesDataTable.css";

function EmployeesDataTable(){
    return(

        <div className="employees-data-table">
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>*/}
                    {/*    <td>John</td>*/}
                    {/*    <td>Doe</td>*/}
                    {/*</tr>*/}
                </tbody>
            </table>

        </div>
    )
}
export default EmployeesDataTable;