import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit'

export interface CategoryItems {
    categoryId: string;
    userId: string;
    id: string;
    name: string;
    quantity: number;
    notes?: string;
};

interface CategoryItemsState {
    categoryItems : CategoryItems[];
    isSuccess: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: CategoryItemsState = {
    categoryItems: [],
    isSuccess: false,
    isLoading: false,
    error: null,
};

export const addCategoryItemThunk = createAsyncThunk(
    'addCategory/addCateoryItem',
   async(categoryItemData: Omit<CategoryItems, 'id'>, thunkAPI) => {
    try{

        const response = await fetch (`http://localhost:5000/categortItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryItemData),
        })

        if (!response.ok) {
            throw new Error('Failed to add categoryItem to this user on server');
        }

        const data = await response.json();
        return data;
    }catch (error: any){
        return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
   }
);

const categoryItemsSlice = createSlice({
    name: 'categoryItems',
    initialState,
    reducers: {
        // addCategoryName: (state, action: PayloadAction<string>) => {
        // state.name = action.Payload;
        // },
        // addCategoryQuantity: (state, action: PayloadAction<number>) => {
        // state.quantity = action.payload;
        // },
        // addCategoryOptionalnote: (state, action: PayloadAction<string>) => {
        // state.note = action.payload;
        // },
    },

extraReducers: (builder) => {
    builder
      .addCase(addCategoryItemThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategoryItemThunk.fulfilled, (state, action: PayloadAction<CategoryItems>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoryItems.push(action.payload)
      })
      .addCase(addCategoryItemThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});
export const {} = categoryItemsSlice.actions;
export default categoryItemsSlice.reducer;