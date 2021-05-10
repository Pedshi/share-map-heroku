import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userReducerName = 'user';

const ADD_PLACES = userReducerName + '/addPlaces';
const GET_PLACES = userReducerName + '/getPlaces';

const initialState = {
  status: 'idle',
  requestSuccess: false,
  places: [],
  error: null
};

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
      .addCase(addPlaces.pending, (state) => {
        state.status = 'loading';
        state.requestSuccess = false;
      })
  }
});

export default userSlice.reducer;