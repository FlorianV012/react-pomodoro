import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../features/tasks";
import { ITask } from "../interfaces";

export default function NewTask() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;
    const id = Date.now();

    const newTask: ITask = {
      id,
      content: inputValue,
      done: false,
      inProgress: false,
    };
    dispatch(addNewTask(newTask));

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
