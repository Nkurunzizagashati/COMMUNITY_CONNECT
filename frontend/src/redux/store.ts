// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice'; // Ensure correct import
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});
