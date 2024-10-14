import { configureStore } from '@reduxjs/toolkit';
import consumerReducer from './consumerSlice';
import providerReducer from './providerSlice';

export const store = configureStore({
	reducer: {
		consumer: consumerReducer,
		provider: providerReducer,
	},
});
