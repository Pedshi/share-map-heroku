import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const authReducerName = 'authentication';

const AUTHENTICATE_USER = authReducerName + '/authenticateUser';
const LOGIN_USER = authReducerName + '/loginUser';

const initialState = {
  user: {},
  status: 'idle',
  authenticated: false,
  error: null
};

export const authenticateUser = createAsyncThunk(
  AUTHENTICATE_USER,
  async () => {
    try{
      await axios.post('/api/user/auth');
      return {};
    }catch(error) { throw error }
  }
);

export const loginUser = createAsyncThunk(
  LOGIN_USER,
  async (user) => {
    try{
      await axios.post('/api/user/login', user);
      return {};
    }catch(error){ throw error }
  }
);

const authSlice = createSlice({
  name: authReducerName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.authenticated = true;
        state.status = 'idle';
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.authenticated = false;
        state.error = error.message;
        state.status = 'rejected';
      })
      .addCase(authenticateUser.fulfilled, (state) => {
        state.authenticated = true;
        state.status = 'idle';
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.authenticated = false;
        state.status = 'idle';
      })
      .addMatcher(isAnyOf (authenticateUser.pending, loginUser.pending), (state) => {
        state.status = 'loading';
      })
  }
});

export default authSlice.reducer;