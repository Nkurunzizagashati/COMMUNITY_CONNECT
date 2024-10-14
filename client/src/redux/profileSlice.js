import { createSlice } from '@reduxjs/toolkit';

// No TypeScript interfaces in plain JS
const initialState = {
	profiles: [], // Empty array initially
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		createProfile(state, action) {
			state.profiles.push(action.payload); // Add new profile
		},
	},
});

export const { createProfile } = profileSlice.actions;
export default profileSlice.reducer;
