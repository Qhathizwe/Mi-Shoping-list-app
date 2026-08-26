import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {type TypedUseSelectorHook } from 'react-redux'

import loginSlice from './Redux/Reducers/LoginSlice'
import registerSlice from './Redux/Reducers/RegisterSlice'
import categorySlice from './Redux/Reducers/CategorySlice'
import categoryItemsSlice from './Redux/Reducers/CategoryItemsSlice'
// import profileSlice from './Redux/Reducers/ProfileSlice'



export const store = configureStore({
  reducer: {
      auth: loginSlice,
      register: registerSlice,
      // profile : profileSlice,
      category : categorySlice,
      categoryItemsSlice: categoryItemsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;