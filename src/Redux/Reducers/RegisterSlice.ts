import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface RegisteredUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string; 
}

interface RegisterState {
  user: RegisteredUser | null; 
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  user: null,
  isSuccess: false,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSuccess = false;
    },
    // Saves the complete response data object coming back from json-server
    registerSuccess: (state, action: PayloadAction<RegisteredUser>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload; 
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetRegisterState: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { registerStart, registerSuccess, registerFailure, resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
