import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
	reducer: {
		consumer: userReducer,
		profile: profileReducer,
	},
});
