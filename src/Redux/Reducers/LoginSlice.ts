import { createSlice } from "@reduxjs/toolkit";
import {type PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    email: string;
    password: string;
}
interface AuthState {
    user : User | null,
    isLoading: boolean;
    error: string | null;
}
const initialState: AuthState ={
    user : null,
    isLoading: false,
    error: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) =>{
            state.isLoading = true;
            state.error = null;
        },

        loginSuccess: (state, action: PayloadAction<User>) =>{
            state.isLoading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action: PayloadAction<string>) =>{
            state.isLoading =false;
            state.error = action.payload;
        },
        logOut: (state) =>{
            state.user = null;
            state.error = null;
        }
        }
})

export default loginSlice.reducer;
export const {loginStart, loginSuccess, loginFailure, logOut} =loginSlice.actions;
