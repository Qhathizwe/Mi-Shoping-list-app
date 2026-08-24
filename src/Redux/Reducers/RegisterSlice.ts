import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

<<<<<<< HEAD
export interface RegisteredUser {
  id?: string;
=======
export interface RegisteredUserForm {
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

<<<<<<< HEAD
interface RegisterState {

  form: Omit<RegisteredUser, 'id'>;

  registeredUser: RegisteredUser | null;
=======
export interface SavedUser extends RegisteredUserForm {
  id?: string;
}

interface AuthState {
  user: SavedUser | null;
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

<<<<<<< HEAD
const initialState: RegisterState = {
  form: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  },
  registeredUser: null,
=======
const initialState: AuthState = {
  user: null,
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
  isSuccess: false,
  isLoading: false,
  error: null,
};

<<<<<<< HEAD
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
=======
export const registerUserThunk = createAsyncThunk<SavedUser, RegisteredUserForm, { rejectValue: string }>(
  "auth/RegisterUser",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
      });
      if (!response.ok) throw new Error("Failed to save credentials");
      const data: SavedUser = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
<<<<<<< HEAD
    
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof RegisterState['form']; value: string }>) => {
      state.form[action.payload.field] = action.payload.value;
    },
    
=======
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
    resetRegisterState: (state) => {
      state.form = { name: '', surname: '', email: '', phone: '', password: '' };
      state.registeredUser = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.error = null;
<<<<<<< HEAD
    }
  },

=======
    },
  },
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
<<<<<<< HEAD
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
=======
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<SavedUser>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});


export const { resetRegisterState } = registerSlice.actions;
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
export default registerSlice.reducer;
