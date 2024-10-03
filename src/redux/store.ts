import { Action, AnyAction, combineReducers } from "redux";
import tasksSlice from "./tasksSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";

const store = configureStore({
    reducer: {
      task : tasksSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;