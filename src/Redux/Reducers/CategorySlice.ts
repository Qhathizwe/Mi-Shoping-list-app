import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  userId: string;       
  sharedWith: string[]; 
}

interface CategoryState {
  category: Category[];
  form: {
    name: string;
  };
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  category: [],
  form: { name: "" },
  isSuccess: false,
  isLoading: false,
  error: null,
};

// CREATE Category
export const addCategoryThunk = createAsyncThunk(
  'category/addCategory',
  async (categoryData: { name: string; userId: string }, thunkAPI) => {
    try {
      const payload: Omit<Category, "id"> = {
        name: categoryData.name,
        userId: categoryData.userId,
        sharedWith: [categoryData.userId], 
      };
      const response = await fetch(`http://localhost:5000/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create category');
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// READ Categories (Fetches lists created by OR shared with this user)
export const getCategoryThunk = createAsyncThunk(
  'category/getCategoryThunk',
  async (userId: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/category`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const allCategories: Category[] = await response.json();
      
      localStorage.setItem("Categories", JSON.stringify(allCategories));
      return allCategories.filter(cat => cat.sharedWith.includes(userId));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE Category Name
export const updateCategoryThunk = createAsyncThunk(
  'category/updateCategory',
  async (params: { id: string; name: string }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/category/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: params.name }),
      });
      if (!response.ok) throw new Error('Failed to update category name');
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE Category (Crucial: Should cascade-delete items later if desired)
export const deleteCategoryThunk = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/category/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove category');
      return id; // Return ID to clear from localized state array
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// SHARE Category with another user email
export const shareCategoryThunk = createAsyncThunk(
  'category/shareCategory',
  async (params: { category: Category; targetEmail: string }, thunkAPI) => {
    try {
      // 1. Find the target user by email
      const userRes = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(params.targetEmail)}`);
      const matchedUsers = await userRes.json();
      if (matchedUsers.length === 0) throw new Error('User email not found');
      
      const targetUserId = matchedUsers[0].id;
      if (params.category.sharedWith.includes(targetUserId)) throw new Error('List already shared with this user');

      // 2. Append target user ID to the shared list array
      const updatedSharedWith = [...params.category.sharedWith, targetUserId];
      const patchRes = await fetch(`http://localhost:5000/category/${params.category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sharedWith: updatedSharedWith }),
      });
      
      if (!patchRes.ok) throw new Error('Failed to update share rules');
      return await patchRes.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategoryFormField: (state, action: PayloadAction<string>) => {
      state.form.name = action.payload;
    },
    resetCategoryForm: (state) => {
      state.form.name = "";
    },
    clearCategories: (state) => {
      state.category = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
        state.category.push(action.payload);
      })
      .addCase(getCategoryThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.category = action.payload;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.category.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) state.category[index] = action.payload;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.category = state.category.filter(cat => cat.id !== action.payload);
      })
      .addCase(shareCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.category.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) state.category[index] = action.payload;
        alert("List successfully shared!");
      });
  }
});

export const { updateCategoryFormField, resetCategoryForm, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
