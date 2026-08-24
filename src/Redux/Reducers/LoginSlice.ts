import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name?: string;     
  surname?: string;
  email: string;
  password: string;
}

interface AuthState {
  
  form: Omit<User, 'id'>;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  form: {
    email: '',
    password: '',
  },
  user: null,
  isLoading: false,
  error: null,
};

// 2. ASYNC THUNK: Handles the network fetch request securely using json-server filtering parameters
export const loginUserThunk = createAsyncThunk<User, AuthState['form']>(
  'auth/loginUserThunk',
  async (loginCredentials, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(loginCredentials.email)}&password=${encodeURIComponent(loginCredentials.password)}`
      );

      if (!response.ok) {
        throw new Error('kukhona inkinga kwi server yakho.');
      }

      const matchingUsers: User[] = await response.json();

      if (matchingUsers.length === 0) {
        throw new Error('akusiyona yi email noma yi password.');
      }

      
      return matchingUsers[0];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Kukhona Okungahambi kahle lungisa umsamu.');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
 
    updateLoginField: (
      state,
      action: PayloadAction<{ field: keyof AuthState['form']; value: string }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
  
    resetLoginForm: (state) => {
      state.form = { email: '', password: '' };
      state.error = null;
    },
    logOut: (state) => {
      state.user = null;
      state.form = { email: '', password: '' };
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload; // Saves your logged-in user profile inside state.user
        state.error = null;
        state.form = { email: '', password: '' }; // Automatically clears credentials upon validation success
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Maps custom reject messages to the error property
      });
  }
});

export const { updateLoginField, resetLoginForm, logOut } = loginSlice.actions;
export default loginSlice.reducer;
