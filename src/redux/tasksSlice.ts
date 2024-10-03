import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetch_tasks, markTaskAsCompleted, toggleTaskCompletion, updateTask } from "./actions"
import ToDoTask from "../models/Task";


export const fetchTasks = createAsyncThunk<ToDoTask[], void>(
  'tasks/fetchTasks',
  async (): Promise<ToDoTask[]> => {
    console.log("tuk sam");
    const tasks: ToDoTask[] = await fetch_tasks();
    return tasks;
  }
);


const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ToDoTask[]>) => {
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


// Export the reducer, either as a default or named export
export default tasksSlice.reducer;