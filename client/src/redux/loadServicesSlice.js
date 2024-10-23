import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loadServices: true,
};

const loadServicesSlice = createSlice({
	name: 'loadServices',
	initialState,
	reducers: {
		load: (state) => {
			state.loadServices = true;
		},

		dontLoad: (state) => {
			state.loadServices = false;
		},
	},
});

export const { load, dontLoad } = loadServicesSlice.actions;

export default loadServicesSlice.reducer;
