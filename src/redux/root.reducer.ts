import { combineReducers } from "redux";
import tasksSlice from "./tasks/tasks.slice";
import userSlice from "./user/user.slice";

const reducers = {
    tasks : tasksSlice.reducer,
    user : userSlice.reducer,
};

const RootReducer = combineReducers(reducers);

export default RootReducer;
