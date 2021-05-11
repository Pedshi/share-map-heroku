import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/login';
import { placeReducer, userReducer } from '../features/userPlaces';

const makeStore = () => configureStore({
  reducer: {
    authentication: authReducer,
    place: placeReducer,
    user: userReducer
  }
});

export default makeStore;