import axios from '../axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchIsAuth } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { IVideoInfo } from '../components/RecomendedVideos';
import VideoBox3 from '../components/VideoBox3';

import filterSVG from '../assets/images/sort.svg';

export default function SearchPage() {
  const searched = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(fetchIsAuth(token));
    }
    axios
      .post('/video/find_video', { searchText: searched.request })
      .then((res) => setVideoList(res.data));
  }, [searched]);
  return (
    <div className="min-h-screen w-full bg-gray-900 pt-24">
      <div className="flex justify-center w-full">
        <div className="w-6/12 border-b-2 border-gray-300 flex items-center cursor-pointer hover:bg-gray-500 rounded-xl p-2">
          <img className="h-8" src={filterSVG} alt="error" />
          <h5 className="text-white font-bold">Filters</h5>
        </div>
      </div>
      <div className="flex-col flex justify-center items-center w-full">
        {videoList.map((item) => {
          return <VideoBox3 {...item} />;
        })}
      </div>
    </div>
  );
}
