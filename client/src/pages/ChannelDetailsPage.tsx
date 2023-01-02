import axios from '../axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIsAuth } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { IVideoInfo } from '../components/RecomendedVideos';
import VideoBox5 from '../components/VideoBox5';
import dateComparator from '../utils/dateComparator';
import { resetAll } from '../redux/slices/currentPageSlice';

interface IChannelInfo {
  email: string;
  image: string;
  name: string;
  subscribers: number;
  videos: IVideoInfo[];
}

const ChannelDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const channelId = useParams().id;
  const isAuth = useSelector((state: RootState) => state.isAuth);
  const [channelInfo, setChannelInfo] = React.useState<IChannelInfo>();
  const [subscribed, setSubscribed] = React.useState(false);
  const [subscribers, setSubscribers] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    dispatch(resetAll());
    const token = window.localStorage.getItem('token');
    if (token) dispatch(fetchIsAuth(token));
    axios.get(`/user/channel_details?id=${channelId}`).then((res) => {
      setChannelInfo(res.data);
      setSubscribers(res.data.subscribers);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    axios
      .get(`/subs/isSubscribed?channelId=${channelId}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => setSubscribed(res.data.message));
  }, [isAuth]);

  function subscribeAction() {
    const token = window.localStorage.getItem('token');
    axios
      .get(`/subs/subscribe?channelId=${channelId}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setSubscribed(res.data.message);
        axios
          .get(`/subs/subscribers?channelId=${channelId}`)
          .then((res) => setSubscribers(res.data.subscribers));
      });
  }

  if (isLoading) return <h1>loading</h1>;

  return (
    <div className="min-h-screen w-full bg-gray-900 pt-32 items-center flex-col flex">
      <div className="grid-cols-2 grid w-8/12 h-fit items-center border-b-2 border-gray-700 pb-2">
        <div className="w-fit flex items-center">
          <div className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden relative">
            <img
              className="h-20 min-w-max"
              src={`http://localhost:3001/${channelInfo?.image}`}
              alt="error"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-white">{channelInfo?.name}</h1>
            <h2 className="text-gray-500">{channelInfo?.email}</h2>
            <h2 className="text-gray-500">{subscribers} subscribers</h2>
          </div>
        </div>
        <button
          onClick={subscribeAction}
          className={
            subscribed
              ? 'bg-gray-400 p-3  rounded-xl text-white hover:bg-gray-500 justify-self-end'
              : 'bg-red-700 p-3 rounded-xl text-white hover:bg-red-500 justify-self-end'
          }>
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className=" flex flex-wrap w-8/12 justify-center p-4">
        {channelInfo?.videos
          .sort(
            (first, second) => dateComparator(first.createdAt) - dateComparator(second.createdAt),
          )
          .map((item) => {
            return <VideoBox5 key={item.id + item.title} {...item} />;
          })}
      </div>
    </div>
  );
};

export default ChannelDetailsPage;
