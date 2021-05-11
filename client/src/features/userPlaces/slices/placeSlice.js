import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const placeReducerName = 'place';

const FETCH_ALL = placeReducerName + '/fetchAll'

const initialState = {
  places: [],
  status: 'idle',
  error: null
}

export const fetchAllPlaces = createAsyncThunk(
  FETCH_ALL,
  async () => {
    try{
      const places = await axios.get('/api/place');
      return places.data;
    }catch(error) { throw error; }
  }
);

const placeSlice = createSlice({
  name: placeReducerName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPlaces.pending, (state) => { 
        state.status = 'loading';
       })
      .addCase(fetchAllPlaces.fulfilled, (state, { payload }) => {
        state.places = payload;
        state.status = 'idle';
      })
      .addCase(fetchAllPlaces.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'rejected';
      })
  }
});

export default placeSlice.reducer;