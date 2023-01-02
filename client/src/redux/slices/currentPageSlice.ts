import { createSlice } from '@reduxjs/toolkit';

interface CurPageState {
  home: boolean;
  liked: boolean;
  subs: boolean;
  upload: boolean;
}

const initialState: CurPageState = {
  home: false,
  liked: false,
  subs: false,
  upload: false,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setHome: (state) => {
      state.home = true;
    },
    setUpload: (state) => {
      state.upload = true;
    },
    setSubs: (state) => {
      state.subs = true;
    },
    setLiked: (state) => {
      state.liked = true;
    },
    resetAll: (state) => {
      state.home = false;
      state.upload = false;
      state.subs = false;
      state.liked = false;
    },
  },
});

export const { setHome, setUpload, setSubs, setLiked, resetAll } = currentPageSlice.actions;

export default currentPageSlice.reducer;
