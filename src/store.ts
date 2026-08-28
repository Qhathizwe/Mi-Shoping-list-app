import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './Redux/Reducers/LoginSlice';
import registerSlice from './Redux/Reducers/RegisterSlice';
import categorySlice from './Redux/Reducers/CategorySlice';
import categoryItemsSlice from './Redux/Reducers/CategoryItemsSlice';
import profileSlice from './Redux/Reducers/ProfileSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'; 

export const store = configureStore({
  reducer: {
      auth: loginSlice,
      register: registerSlice,
      category: categorySlice,
      categoryItemsSlice: categoryItemsSlice,
      profile: profileSlice, // 2. Reactivate key mapping
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
