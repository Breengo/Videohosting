import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

import { resetAll, setSubs } from '../redux/slices/currentPageSlice';

import SidebarSmall from '../components/SidebarSmall';
import axios from '../axios';
import { IVideoInfo } from '../components/RecomendedVideos';
import { fetchIsAuth } from '../redux/slices/authSlice';
import VideoBox4 from '../components/VideoBox4';
import dateConverter from '../utils/dateConverter';
import dateComparator from '../utils/dateComparator';

const SubscriptionsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sideBarState = useSelector((state: RootState) => state.sideBar.show);
  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);

  React.useEffect(() => {
    dispatch(resetAll());
    dispatch(setSubs());
    const token = window.localStorage.getItem('token');
    if (token) dispatch(fetchIsAuth(token));
    axios
      .get('/video/subscription_videos', {
        headers: {
          auth: token,
        },
      })
      .then((res) => setVideoList(res.data));
  }, []);
  return (
    <div>
      {!sideBarState && <SidebarSmall />}
      <div
        className={
          sideBarState
            ? 'mt-16 ml-60 pt-8 pl-6 bg-gray-900 flex flex-wrap min-h-screen justify-center'
            : 'mt-16 ml-20 pt-8 pl-6 bg-gray-900 flex flex-wrap min-h-screen justify-center'
        }>
        <h1 className="text-white font-bold text-3xl text-left w-full pb-2 border-gray-600 border-b-2">
          Subscriptions
        </h1>

        <div className="flex flex-wrap w-full border-b-2 border-gray-500">
          {videoList
            .sort(
              (first, second) => dateComparator(first.createdAt) - dateComparator(second.createdAt),
            )
            .map((item) => {
              {
                return <VideoBox4 key={item.id + item.title} {...item} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
