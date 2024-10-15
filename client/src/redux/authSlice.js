import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Action for starting the login process (sets loading state)
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		// Action to store the user and token upon successful login
		loginSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.loading = false;
		},
		// Action for handling login failure (sets error message)
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Action for logging out the user
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
		// Optional: Action to clear errors
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	clearError,
} = authSlice.actions;

export default authSlice.reducer;
