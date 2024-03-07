import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { taskIsDone, taskInProgress, deleteTask } from "../features/tasks";
export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <>
      <h2>My tasks</h2>
      <ul className="tasks-list">
        {tasks &&
          tasks.map((task, index: number) => (
            <li key={index} className="task-container">
              <div>
                <input
                  type="checkbox"
                  id={task.id.toString()}
                  checked={task.done}
                  onChange={() => dispatch(taskIsDone(task))}
                />
                <label htmlFor={task.id.toString()}>{task.content}</label>
              </div>

              <div>
                {!task.done && (
                  <button
                    className="small info"
                    onClick={() => dispatch(taskInProgress(task))}
                  >
                    Do now
                  </button>
                )}
                <button
                  className="small alert"
                  onClick={() => dispatch(deleteTask(task))}
                >
                  X
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
