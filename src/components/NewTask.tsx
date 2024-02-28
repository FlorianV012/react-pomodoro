import { useRef } from "react";
import { ITask } from "../interfaces";

interface INewTaskProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export default function NewTask({ tasks, setTasks }: INewTaskProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;
    const id = Date.now();
    setTasks([
      ...tasks,
      { content: inputValue, done: false, inProgress: false, id },
    ]);
    inputRef.current!.value = "";
  }

  return (
    <div>
      <h3>New task</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit" style={{ display: "none" }}>
          Add Task
        </button>
      </form>
    </div>
  );
}
