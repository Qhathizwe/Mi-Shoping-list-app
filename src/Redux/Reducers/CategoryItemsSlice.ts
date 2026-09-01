import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  picture?: string;
  categoryId: string;
  userId: string; 
}

interface ListItemsState {
  listItem: ListItem[];
  form: {
    name: string;
    quantity: number;
    notes: string;
    picture: string; 
  };
  editingItem: ListItem | null; 
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ListItemsState = {
  listItem: [],
  form: { name: "", quantity: 0, notes: "", picture: "" },
  editingItem: null,
  isSuccess: false,
  isLoading: false,
  error: null,
};

// CREATE Item
export const addCategoryItemThunk = createAsyncThunk(
  'categoryItems/addCategoryItem',
  async (categoryItemData: Omit<ListItem, 'id'>, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/categoryItems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryItemData),
      });
      if (!response.ok) throw new Error('Failed to create item');
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// READ Items
export const getCategoryItemThunk = createAsyncThunk(
  'categoryItems/getCategoryItemThunk',
  async (params: { categoryId: string }, thunkAPI) => {
    try {
      
      const response = await fetch(`http://localhost:5000/categoryItems?categoryId=${params.categoryId}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch items');
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE Item
export const updateCategoryItemThunk = createAsyncThunk(
  'categoryItems/updateCategoryItem',
  async (itemData: ListItem, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/categoryItems/${itemData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      if (!response.ok) throw new Error('Failed to update list item');
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE Item
export const deleteCategoryItemThunk = createAsyncThunk(
  'categoryItems/deleteCategoryItem',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/categoryItems/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoryItemsSlice = createSlice({
  name: 'categoryItems',
  initialState,
  reducers: {
    updateItemFormField: (state, action: PayloadAction<{ field: keyof ListItemsState['form']; value: string | number }>) => {
      const { field, value } = action.payload;
      if (field === 'quantity') {
        state.form.quantity = Number(value) || 1;
      } else {
        state.form[field] = String(value);
      }
    },
    setEditingItem: (state, action: PayloadAction<ListItem | null>) => {
      state.editingItem = action.payload;
      if (action.payload) {
        state.form = {
          name: action.payload.name,
          quantity: action.payload.quantity,
          notes: action.payload.notes || "",
          picture: action.payload.picture || "",
        };
      }
    },
    resetItemForm: (state) => {
      state.form = { name: "", quantity: 1, notes: "", picture: "" };
      state.editingItem = null;
      state.error = null;
    },
    clearItems: (state) => {
      state.listItem = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryItemThunk.fulfilled, (state, action: PayloadAction<ListItem>) => {
        state.listItem.push(action.payload);
      })
      .addCase(getCategoryItemThunk.fulfilled, (state, action: PayloadAction<ListItem[]>) => {
        state.listItem = action.payload;
      })
      .addCase(updateCategoryItemThunk.fulfilled, (state, action: PayloadAction<ListItem>) => {
        const index = state.listItem.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.listItem[index] = action.payload;
      })
      .addCase(deleteCategoryItemThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.listItem = state.listItem.filter(item => item.id !== action.payload);
      });
  }
});

export const { updateItemFormField, setEditingItem, resetItemForm, clearItems } = categoryItemsSlice.actions;
export default categoryItemsSlice.reducer;
