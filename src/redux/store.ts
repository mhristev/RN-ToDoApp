import tasksSlice from "./tasks/tasks.slice";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import RootReducer from "./root.reducer";

const store = configureStore({
    reducer: RootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;