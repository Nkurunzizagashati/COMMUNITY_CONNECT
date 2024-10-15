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

interface ProfileState {
  profiles: Profile[];
}

const initialState: ProfileState = {
  profiles: [], // Empty array initially
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile(state, action: PayloadAction<Profile>) {
      state.profiles.push(action.payload); // Add new profile
    },
  },
});

export const { createProfile } = profileSlice.actions;
export default profileSlice.reducer;
