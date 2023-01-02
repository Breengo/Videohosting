import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideSideBar } from '../redux/slices/showSideBarSlice';

import VideoDetailsComments from '../components/VideoDetailsComments';
import VideoDetailsInfo from '../components/VideoDetailsInfo';
import VideoBox2 from '../components/VideoBox2';
import { AppDispatch, RootState } from '../redux/store';
import { resetAll } from '../redux/slices/currentPageSlice';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import { IVideoInfo } from '../components/RecomendedVideos';
import { fetchIsAuth } from '../redux/slices/authSlice';

const VideoDetails: React.FC = () => {
  const sideBarState = useSelector((state: RootState) => state.sideBar.show);
  const [videoInfo, setVideoInfo] = React.useState<IVideoInfo | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  React.useEffect(() => {
    dispatch(hideSideBar());
    dispatch(resetAll());
    window.scrollTo(0, 0);
    const token = window.localStorage.getItem('token');
    if (token) dispatch(fetchIsAuth(token));
    axios.get(`/video/video_details?id=${params.id}`).then((res) => setVideoInfo(res.data));
  }, []);

  return (
    <div className="bg-gray-800 pt-28 px-24 min-h-screen flex relative">
      {sideBarState && (
        <div
          onClick={() => dispatch(hideSideBar())}
          className="absolute inset-0 bg-black z-30 opacity-70"></div>
      )}
      {videoInfo && (
        <div className="w-11/12">
          <VideoDetailsInfo {...videoInfo} />
          <VideoDetailsComments {...videoInfo} />
        </div>
      )}
      <div className="ml-6">
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
        <VideoBox2 />
      </div>
    </div>
  );
};

export default VideoDetails;
