import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface CategoryItems {
  id?: string;
  name: string;
}

interface CategoryState {
  form: Omit<CategoryItems, 'id'>;
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  form: {
    name: '',
  },
  isSuccess: false,
  isLoading: false,
  error: null,
};


export const addCategoryThunk = createAsyncThunk<CategoryItems, Omit<CategoryItems, 'id'>>(
  'category/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/users/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to add category on server');
      }

      const data = await response.json();
      return data as CategoryItems;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
   
    updateCategoryForm: (
      state,
      action: PayloadAction<{ field: keyof CategoryState['form']; value: string }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.form.name = '';
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.form.name = ''; 
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateCategoryForm, resetForm } = categorySlice.actions;
export default categorySlice.reducer;
