import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
	name: 'services',
	initialState: {
		data: [],
		pending: false,
		error: null,
	},
	reducers: {
		setPending: (state) => {
			state.pending = true;
			state.error = null; // Clear previous errors
		},
		setServices: (state, action) => {
			state.data = action.payload;
			state.pending = false;
			state.error = null;
		},
		setError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
	},
});

export const { setPending, setServices, setError } =
	serviceSlice.actions;
export default serviceSlice.reducer;
