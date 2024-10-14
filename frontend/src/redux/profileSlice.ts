import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Service {
  title: string;
  description: string;
  price: number;
}

interface Profile {
  name: string;
  email: string;
  services: Service[];
  availability: string[];
}

const initialState: { profiles: Profile[] } = {
  profiles: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile: (state, action: PayloadAction<Profile>) => {
      console.log('Profile being added:', action.payload);
      state.profiles.push(action.payload); // Add profile to state
    },
  },
});

export const { createProfile } = profileSlice.actions;
export default profileSlice.reducer;
