// import { useState } from 'react'
import "./App.scss";
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <>
      <h1 className="mb-5 text-center">My dashboard</h1>
      <div className="dashboard-container">
        <div className="left"></div>
        <div className="right">
          <Pomodoro />
        </div>
      </div>
    </>
  );
}

export default App;
