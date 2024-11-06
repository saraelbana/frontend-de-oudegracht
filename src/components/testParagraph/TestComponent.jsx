import { useEffect, useState } from "react";
import {deoudegrachtApi, rolesEndpoint} from "../../deoudegrachtApi.js";

function TestComponent() {
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
        const response = await deoudegrachtApi.get(rolesEndpoint);
        setRoles(response.data.allRoles);
        console.log("Roles fetched successfully!", response.data.allRoles);
    } catch (e) {
        console.log("Error fetching roles", e);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
      <div>
        <p>Here you can find the roles:</p>
        <ul>
          {roles.map((role, index) => (
              <li key={index}>{role}</li>
          ))}
        </ul>
      </div>
  );
}
export default TestComponent;