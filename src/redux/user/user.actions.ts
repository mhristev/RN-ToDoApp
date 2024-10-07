import { createAsyncThunk } from '@reduxjs/toolkit';
import 'firebase/firestore';
import FirestoreService from '../../services/FirestoreService';
import APP_CONSTANTS from '../../constants';

export const signInUser = createAsyncThunk(
    APP_CONSTANTS.SIGN_IN_USER,
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
      try {
        const userId = await FirestoreService.signIn(email, password);
        return userId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const signUpUser = createAsyncThunk(
    APP_CONSTANTS.SIGN_UP_USER,
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
      try {
        const userId = await await FirestoreService.signUp(email, password);
        return userId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const logoutUser = createAsyncThunk(
    APP_CONSTANTS.LOGOUT_USER,
    async (_, { rejectWithValue }) => {
      try {
        await await FirestoreService.logout();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );