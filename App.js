import React from "react";
import "./App.css";
import GenerateAllUsers from "./component/generate-all-users/generate-all-users.component";
import MoveUser from "./component/move-user/move-user.component";
/*
This version of parcel is deperacated but parcel is lightweight

**** Make sure there is a manager in one store ******** 
    *****  otherwise drivers can't connect ****
*/
const App = () => {
  return (
    <div>
      <div className="center">
        <GenerateAllUsers storeId={"psq2"} manager={"felipe"} />
       
        <MoveUser id={4545} storeId={"psq1"} role={"driver"} />
        <MoveUser id={ 8954} storeId={"psq1"} role={"driver"} />
      </div>
    </div>
  );
};

export default App;
