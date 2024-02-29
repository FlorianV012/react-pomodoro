import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../interfaces";

interface IInitialState {
  tasks: ITask[];
}

const initialState: IInitialState = {
  tasks: [
    { id: 1, content: "Wall of <3", done: false, inProgress: false },
    { id: 2, content: "Research talk slides", done: true, inProgress: false },
    { id: 3, content: "Inbox 0", done: false, inProgress: false },
    { id: 4, content: "design list of tasks", done: false, inProgress: false },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    taskIsDone: (state, action: PayloadAction<ITask>) => {
      const taskId = action.payload.id;

      const taskToUpdate = state.tasks.find(
        (task) => task.id === taskId
      ) as ITask;
      if (taskToUpdate) {
        taskToUpdate.done = !taskToUpdate.done;
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
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      const taskId = action.payload.id;

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const { addNewTask, taskIsDone, taskInProgress, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
