import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Category{
  id: string;
  name: string;
  userId: string;
}

interface CategoryState {
  category: Category[];
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  category: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

//add thunk
export const addCategoryThunk = createAsyncThunk(

  'category/addCategory',
  async (categoryData: Omit<Category , "id">, thunkAPI) => {
    try {
  
      const response = await fetch(`http://localhost:5000/category`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to add category to this user on server');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

//fetching category DATA THUNK
export const getCategoryThunk = createAsyncThunk(
  'category/getCategoryThunk', 
  async () => {
    const response = await fetch('http://localhost:5000/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    
    const data = await response.json();
    return data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
   
    // updateCategoryForm: (state,action: PayloadAction<string> ) => {
    //   state. = action.payload;
    // },
    // resetForm: (state) => {
    //   state.form.name = '';
    //   state.isSuccess = false;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category.push(action.payload)
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder.addCase(getCategoryThunk.fulfilled, (state, action) =>{
      state.isLoading =false;
      state.category = action.payload;
    });
  }
});

export const {  } = categorySlice.actions;
export default categorySlice.reducer;
