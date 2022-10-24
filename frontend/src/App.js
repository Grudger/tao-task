import React from 'react';
import './App.css';
import StudentTable from "./components/StudentTable";

function App() {
  return (
    <div className="App">
      <h1>Hello, Sok Eian !</h1>
      <p>Available student records</p>
      <StudentTable />
    </div>
  );
}

export default App;
