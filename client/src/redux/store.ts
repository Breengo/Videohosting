import { configureStore } from '@reduxjs/toolkit';
import showSideBarSlice from './slices/showSideBarSlice';
import currentPageSlice from './slices/currentPageSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    sideBar: showSideBarSlice,
    curPage: currentPageSlice,
    isAuth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
