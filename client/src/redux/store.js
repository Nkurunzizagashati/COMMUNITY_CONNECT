import { configureStore } from '@reduxjs/toolkit';
import consumerReducer from './consumerSlice';
import providerReducer from './providerSlice';
import serviceReducer from './serviceSlice';
import authReducer from './authSlice';
import loadServicesReducer from './loadServicesSlice';

export const store = configureStore({
	reducer: {
		consumers: consumerReducer,
		providers: providerReducer,
		services: serviceReducer,
		authUser: authReducer,
		loadServices: loadServicesReducer,
	},
});
