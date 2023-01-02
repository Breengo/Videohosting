import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { resetAll, setHome } from '../redux/slices/currentPageSlice';
import { AppDispatch, RootState } from '../redux/store';

import RecomendedVideos from '../components/RecomendedVideos';
import SidebarSmall from '../components/SidebarSmall';
import { fetchIsAuth } from '../redux/slices/authSlice';

const MainPage = () => {
  const sideBarState = useSelector((state: RootState) => state.sideBar.show);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(resetAll());
    dispatch(setHome());
    window.scrollTo(0, 0);
    const token = window.localStorage.getItem('token');
    if (token) dispatch(fetchIsAuth(token));
  }, []);

  return (
    <>
      {!sideBarState && <SidebarSmall />}
      <RecomendedVideos />
    </>
  );
};

export default MainPage;
