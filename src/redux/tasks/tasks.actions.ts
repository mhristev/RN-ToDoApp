import ToDoTask from "../../models/Task";
import { createAsyncThunk } from "@reduxjs/toolkit";
import FirestoreService from "../../services/FirestoreService";

interface MyErrorType {
  message: string;
  code?: string;
}

export const fetch_tasks = createAsyncThunk<ToDoTask[], string, { rejectValue: MyErrorType }>(
  'tasks/fetchTasks',
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
    'tasks/deleteTask',
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
    'tasks/addTask',
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
    'tasks/updateTask',
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
    'tasks/toggleTaskCompletion',
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