import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	providers: [],
	loading: false,
	error: null,
};

const providerSlice = createSlice({
	name: 'providers',
	initialState,
	reducers: {
		// Action to set all providers
		setProviders: (state, action) => {
			state.providers = action.payload;
		},
	},
});

export const { setProviders } = providerSlice.actions;

export default providerSlice.reducer;
