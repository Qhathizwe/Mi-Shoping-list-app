// import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// export interface ProfileState {
//   id?: number | string;
//   name: string;
//   surname: string;
//   email: string;
//   phone: string;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: ProfileState = {
//   name: '',
//   surname: '',
//   email: '',
//   phone: '',
//   isLoading: false,
//   error: null,
// };

// // Change this line inside ProfileSlice.ts:
// // const BASE_API_URL = 'http://127.0.0';

// // To match your LoginSlice exactly:
// const BASE_API_URL = 'http://localhost:5000/users';


// // Helper function to extract user ID from the global Redux state
// const getAuthenticatedUserId = (state: any): string | number | null => {
//   // ✅ FIXED: Correctly points to state.auth because of your store setup
//   return state.auth?.user?.id || null;
// };

// // Async Thunk to fetch current user data
// export const fetchProfileData = createAsyncThunk(
//   'profile/fetchProfileData',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as any;
//       const userId = getAuthenticatedUserId(state);

//       if (!userId) {
//         throw new Error('No authenticated user session found.');
//       }

//       const response = await fetch(`${BASE_API_URL}/${userId}`);
//       if (!response.ok) throw new Error('Failed to fetch profile from database.');
      
//       return await response.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async Thunk to save user data
// export const updateProfileData = createAsyncThunk(
//   'profile/updateProfileData',
//   async (formData: Omit<ProfileState, 'isLoading' | 'error'>, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as any;
//       const userId = getAuthenticatedUserId(state);

//       if (!userId) {
//         throw new Error('Authentication session expired.');
//       }

//       const response = await fetch(`${BASE_API_URL}/${userId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, id: userId }), 
//       });
      
//       if (!response.ok) throw new Error('Failed to update profile records.');
//       return await response.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     clearProfileStore: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfileData.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<any>) => {
//         state.isLoading = false;
//         state.id = action.payload.id;
//         state.name = action.payload.name || '';
//         state.surname = action.payload.surname || '';
//         state.email = action.payload.email || '';
//         state.phone = action.payload.phone || '';
//       })
//       .addCase(fetchProfileData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateProfileData.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<any>) => {
//         state.isLoading = false;
//         state.name = action.payload.name;
//         state.surname = action.payload.surname;
//         state.email = action.payload.email;
//         state.phone = action.payload.phone;
//       })
//       .addCase(updateProfileData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearProfileStore } = profileSlice.actions;
// export default profileSlice.reducer;
