import React from "react";
import TodoAppBar from "./Components/ToDo/Appbar";
import BasicTable from "./Components/ToDo/Table";

function App() {
  

  return (
    <div>
      <div>
        <TodoAppBar></TodoAppBar>
        <BasicTable />
        
      </div>
    </div>
  );
}

export default App;
