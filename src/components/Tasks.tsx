import { ITask } from "../interfaces";

interface ITasksProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export default function Tasks({ tasks, setTasks }: ITasksProps) {
  function taskIsDone(key: number) {
    const copyTasks = [...tasks];
    copyTasks[key].done = !copyTasks[key].done;
    if (copyTasks[key].inProgress) {
      copyTasks[key].inProgress = false;
    }
    setTasks(copyTasks);
  }

  function taskInProgress(key: number) {
    const copyTasks = [...tasks];
    copyTasks[key].inProgress = !copyTasks[key].inProgress;
    copyTasks.forEach((task) => {
      if (task.content !== tasks[key].content && task.inProgress) {
        task.inProgress = false;
      }
    });
    setTasks(copyTasks);
  }

  function handleDelete(key: number) {
    setTasks(tasks.filter((task) => task.id !== tasks[key].id));
  }

  return (
    <>
      <h2>My tasks</h2>
      <ul>
        {tasks &&
          tasks.map((task, index) => (
            <li key={index} className="task-container">
              <div>
                <input
                  type="checkbox"
                  name=""
                  id={task.id.toString()}
                  checked={task.done}
                  onChange={() => taskIsDone(index)}
                />
                <label htmlFor="">{task.content}</label>
              </div>

              <div>
                {!task.done && (
                  <button onClick={() => taskInProgress(index)}>Do now</button>
                )}
                <button onClick={() => handleDelete(index)}>X</button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
