import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface RegisteredUser {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string; 
}

interface RegisterState {

  form: Omit<RegisteredUser, 'id'>;

  registeredUser: RegisteredUser | null;
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  form: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  },
  registeredUser: null,
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const registerUserThunk = createAsyncThunk<RegisteredUser, Omit<RegisteredUser, 'id'>>(
  'register/registerUserThunk',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed on server');
      }

      const data = await response.json();
      return data as RegisteredUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof RegisterState['form']; value: string }>) => {
      state.form[action.payload.field] = action.payload.value;
    },
    
    resetRegisterState: (state) => {
      state.form = { name: '', surname: '', email: '', phone: '', password: '' };
      state.registeredUser = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<RegisteredUser>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registeredUser = action.payload; // Saves returned data object with generated JSON id
        state.error = null;
        
        state.form = { name: '', surname: '', email: '', phone: '', password: '' };
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      });
  }
});

export const { updateFormField, resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
