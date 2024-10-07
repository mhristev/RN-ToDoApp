import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetch_tasks, toggleTaskCompletion, updateTask } from "./tasks.actions"
import ToDoTask from "../../models/ToDoTask";
import APP_CONSTANTS from "../../constants";


const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: APP_CONSTANTS.SLICE_NAME_TASKS,
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetch_tasks.fulfilled, (state, action: PayloadAction<ToDoTask[]>) => {
      state.tasks = action.payload;
    })
    .addCase(deleteTask.fulfilled, (state, action: PayloadAction<ToDoTask[]>) => {
      state.tasks = action.payload;
    })
    .addCase(addTask.fulfilled, (state, action: PayloadAction<ToDoTask[]>) => {
      state.tasks = action.payload;
    })
    .addCase(updateTask.fulfilled, (state, action: PayloadAction<ToDoTask[]>) => {
      state.tasks = action.payload;
    })
    .addCase(toggleTaskCompletion.fulfilled, (state, action: PayloadAction<ToDoTask>) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    });
  }
});

export default tasksSlice;