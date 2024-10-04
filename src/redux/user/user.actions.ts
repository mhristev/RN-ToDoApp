import { createAsyncThunk } from '@reduxjs/toolkit';
import 'firebase/firestore';
import FirestoreService from '../../services/FirestoreService';

export const signInUser = createAsyncThunk(
    'user/signInUser',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
      try {
        const userId = FirestoreService.signIn(email, password);
        return userId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const signUpUser = createAsyncThunk(
    'user/signUpUser',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
      try {
        const userId = await FirestoreService.signUp(email, password);
        return userId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
      try {
        await FirestoreService.logout();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );