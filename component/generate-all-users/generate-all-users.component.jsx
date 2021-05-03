import React, { useEffect, useState } from "react";
import axios from "axios";
import GenerateUser from "../generate-user/generate-user.component";
import "./generate-all-users.css";
// const ENDPOINT = "https://defiance-prod.herokuapp.com"
const ENDPOINT = "http://localhost:3002"

const GenerateAllUsers = ({ storeId, manager }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios.get(ENDPOINT + "/api/users").then((res) => {
      setUser(res.data);
    });
  }, []);
  console.log(users);
  return (
    <div className="all-users">
      <div className="storename">{storeId}</div>
      <div className="user-buttons">
        {users.map((user, index) => (
          <div key={index}>
            {user.firstName.toUpperCase() === manager.toUpperCase() ? (
              <GenerateUser
                id={user.employeeId}
                storeId={storeId}
                role="manager"
                name={user.firstName}
              />
            ) : (
              <GenerateUser
                id={user.employeeId}
                storeId={storeId}
                role="driver"
                name={user.firstName}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateAllUsers;
