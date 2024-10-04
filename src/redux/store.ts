import tasksSlice from "./tasks/tasks.slice";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

const store = configureStore({
    reducer: {
      tasks : tasksSlice,
      user : userSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;