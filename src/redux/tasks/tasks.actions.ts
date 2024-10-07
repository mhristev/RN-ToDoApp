import ToDoTask from "../../models/ToDoTask";
import { createAsyncThunk } from "@reduxjs/toolkit";
import FirestoreService from "../../services/FirestoreService";
import APP_CONSTANTS from "../../constants";

interface MyErrorType {
  message: string;
  code?: string;
}

export const fetch_tasks = createAsyncThunk<ToDoTask[], string, { rejectValue: MyErrorType }>(
  APP_CONSTANTS.FETCH_TASKS,
  async (userId, { rejectWithValue }) => {
    try {
        return await FirestoreService.fetchTasks(userId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

export const deleteTask = createAsyncThunk<ToDoTask[],{taskId: string, userId: string}, { rejectValue: MyErrorType }>(
    APP_CONSTANTS.DELETE_TASK,
    async ({taskId, userId}, { rejectWithValue }) => {
      try {
        return FirestoreService.deleteTask(taskId, userId);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        }
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  );

export const addTask = createAsyncThunk<ToDoTask[], {task: ToDoTask, userId: string}, { rejectValue: MyErrorType }>(
    APP_CONSTANTS.ADD_TASK,
    async ({task, userId}, { rejectWithValue }) => {
      try {
        return FirestoreService.addTask(task, userId);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        }
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  );

export const updateTask = createAsyncThunk<ToDoTask[],{ updatedTask:ToDoTask, userId: string }, { rejectValue: MyErrorType }>(
    APP_CONSTANTS.UPDATE_TASK,
    async ({ updatedTask, userId }, { rejectWithValue }) => {
        try {
          return FirestoreService.updateTask(updatedTask, userId);
    
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue({ message: error.message });
            }
            return rejectWithValue({ message: 'Unknown error' });
        }
    }
);

export const toggleTaskCompletion = createAsyncThunk<ToDoTask, {taskId: string, userId: string }, { rejectValue: MyErrorType }>(
    APP_CONSTANTS.TOGGLE_TASK_COMPLETION,
    async ({ taskId, userId }, { rejectWithValue }) => {
        try {
            return FirestoreService.toggleTaskCompletion(taskId, userId);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue({ message: error.message });
            }
            return rejectWithValue({ message: 'Unknown error' });
        }
    }
);