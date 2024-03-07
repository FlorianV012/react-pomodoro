import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { toggleTheme } from "./features/theme";
import "./App.scss";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import Progress from "./components/Progress";
import { useEffect } from "react";

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className={`app ${theme}-mode`}>
      <h1>My dashboard</h1>
      <button
        className={`theme-btn ${theme === "dark" ? "secondary" : "info"}`}
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <div className="dashboard-container">
        <div className={`left ${theme}-mode`}>
          <Progress />
          <Tasks />
          <NewTask />
        </div>
        <div className={`right ${theme}-mode`}>
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}

export default App;
