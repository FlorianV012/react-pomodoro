import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks";
import themeReducer from "./features/theme";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
