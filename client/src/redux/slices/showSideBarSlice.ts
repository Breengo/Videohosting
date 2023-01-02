import { createSlice } from '@reduxjs/toolkit';

interface SideBarState {
  show: boolean;
}

const initialState: SideBarState = {
  show: true,
};

export const showSideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.show = !state.show;
    },
    hideSideBar: (state) => {
      state.show = false;
    },
  },
});

export const { toggleSideBar, hideSideBar } = showSideBarSlice.actions;

export default showSideBarSlice.reducer;
