import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const userReducerName = 'user';

const LOGIN = userReducerName + '/login';
const ADD_PLACES = userReducerName + '/addPlaces';
const GET_PLACES = userReducerName + '/getPlaces';

const initialState = {
  status: 'idle',
  authenticated: false,
  requestSuccess: false,
  places: [],
  error: null
};

export const loginUser = createAsyncThunk(
  LOGIN,
  async (user) => {
    try{
      await axios.post('/api/user/login', user);
      return {};
    }catch(error){ throw error }
  }
);

export const addPlaces = createAsyncThunk(
  ADD_PLACES,
  async (places) => {
    try{
      await axios.put('/api/user/place/', places);
      return {};
    }catch(error) { throw error; }
  }
);

export const fetchPlaces = createAsyncThunk(
  GET_PLACES,
  async () => {
    try{
      const places = await axios.get('/api/user/place');
      return places.data;
    }catch(error) { throw error; }
  }
);

const userSlice = createSlice({
  name: userReducerName,
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
      .addCase(addPlaces.fulfilled, (state) => {
        state.status = 'idle';
        state.requestSuccess = true;
      })
      .addCase(addPlaces.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = 'rejected';
      })
      .addCase(fetchPlaces.fulfilled, (state, { payload }) => {
        state.places = payload;
        state.status = 'idle';
      })
      .addCase(fetchPlaces.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = 'rejected';
      })
      .addMatcher(isAnyOf (loginUser.pending, addPlaces.pending), (state) => {
        state.status = 'loading';
        state.requestSuccess = false;
      })
  }
});

export default userSlice.reducer;