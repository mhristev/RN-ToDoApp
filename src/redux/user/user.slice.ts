import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInUser, signUpUser } from './user.actions';


const initialState = {
    userId: null,
    loading: false, 
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userId = action.payload;
            })
            .addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            })
            .addCase(signUpUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userId = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;