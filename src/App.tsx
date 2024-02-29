import "./App.scss";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import Progress from "./components/Progress";

function App() {
  return (
    <>
      <h1 className="mb-5 text-center">My dashboard</h1>
      <div className="dashboard-container">
        <div className="left">
          <Progress />
          <Tasks />
          <NewTask />
        </div>
        <div className="right">
          <Pomodoro />
        </div>
      </div>
    </>
  );
}

export default App;
