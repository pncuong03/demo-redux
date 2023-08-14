import { Action, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import FilterSlice from '../components/Filter/FilterSlice';
import UserSlice from '../components/Tables/UserSlice';


// Sử dụng configureStore để tạo Redux store
const store = configureStore({
  reducer: {
    user: UserSlice,
    filters: FilterSlice,
  }, // Truyền userReducer vào đây
  middleware: [thunkMiddleware], // Sử dụng thunkMiddleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
