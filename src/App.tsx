import { useState } from "react";
import "./App.scss";
import { ITask } from "./interfaces";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    { id: 1, content: "Wall of <3", done: false, inProgress: false },
    { id: 2, content: "Research talk slides", done: true, inProgress: false },
    { id: 3, content: "Inbox 0", done: false, inProgress: false },
    { id: 4, content: "design list of tasks", done: false, inProgress: false },
  ]);

  return (
    <>
      <h1 className="mb-5 text-center">My dashboard</h1>
      <div className="dashboard-container">
        <div className="left">
          <Tasks tasks={tasks} setTasks={setTasks} />
          <NewTask tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="right">
          <Pomodoro tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

export default App;
