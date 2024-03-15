import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskReducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) { 
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;  
  } 
};

const saveState = (state) => {  
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasks", serializedState);
  } catch {
    // Ignore write errors
  }
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
