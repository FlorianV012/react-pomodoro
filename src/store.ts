import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
