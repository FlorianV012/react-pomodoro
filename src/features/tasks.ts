import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../interfaces";

interface IInitialState {
  tasks: ITask[];
}

const getInitialStateFromLocalStorage = (): IInitialState => {
  const savedTasks = localStorage.getItem("dashboard");
  if (savedTasks) {
    return { tasks: JSON.parse(savedTasks) };
  } else {
    return {
      tasks: [
        { id: 1, content: "Wall of <3", done: false, inProgress: false },
        {
          id: 2,
          content: "Research talk slides",
          done: true,
          inProgress: false,
        },
        { id: 3, content: "Inbox 0", done: false, inProgress: false },
        {
          id: 4,
          content: "design list of tasks",
          done: false,
          inProgress: false,
        },
      ],
    };
  }
};

const initialState: IInitialState = getInitialStateFromLocalStorage();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem("dashboard", JSON.stringify(state.tasks));
    },
    taskIsDone: (state, action: PayloadAction<ITask>) => {
      const taskId = action.payload.id;

      const taskToUpdate = state.tasks.find(
        (task) => task.id === taskId
      ) as ITask;
      if (taskToUpdate) {
        taskToUpdate.done = !taskToUpdate.done;
        localStorage.setItem("dashboard", JSON.stringify(state.tasks));
      }
    },
    taskInProgress: (state, action: PayloadAction<ITask>) => {
      const taskId = action.payload.id;

      state.tasks.forEach((task) => {
        if (task.id === taskId) {
          task.inProgress = !task.inProgress;
        } else {
          task.inProgress = false;
        }
      });
      localStorage.setItem("dashboard", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      const taskId = action.payload.id;

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("dashboard", JSON.stringify(state.tasks));
    },
  },
});

export const { addNewTask, taskIsDone, taskInProgress, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
