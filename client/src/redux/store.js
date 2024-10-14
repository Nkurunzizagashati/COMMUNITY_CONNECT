import { configureStore } from '@reduxjs/toolkit';
import consumerReducer from './consumerSlice';
import providerReducer from './providerSlice';
import serviceReducer from './serviceSlice';

export const store = configureStore({
	reducer: {
		consumers: consumerReducer,
		providers: providerReducer,
		services: serviceReducer,
	},
});
