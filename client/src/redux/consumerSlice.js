import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	consumers: [], // List of all consumers
	loading: false,
	error: null,
};

const consumerSlice = createSlice({
	name: 'consumers',
	initialState,
	reducers: {
		// Action to set all consumers
		setConsumers: (state, action) => {
			state.consumers = action.payload;
		},
	},
});

export const { setConsumers } = consumerSlice.actions;

export default consumerSlice.reducer;
