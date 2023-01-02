import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../axios';

import signInSvg from '../assets/images/user.svg';

interface IChannels {
  name: string;
  id: number;
  image: string;
}

const Sidebar: React.FC = () => {
  const [showScroll, setShowScroll] = React.useState(false);
  const [channels, setChannels] = React.useState<IChannels[] | []>([]);

  const current = useSelector((state: RootState) => state.curPage);
  const isAuth = useSelector((state: RootState) => state.isAuth);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    axios
      .get('/subs/subscribes', {
        headers: {
          auth: token,
        },
      })
      .then((res) => setChannels(res.data));
  }, []);

  return (
    <aside
      onMouseOver={() => setShowScroll(true)}
      onMouseLeave={() => setShowScroll(false)}
      className={
        showScroll
          ? 'bg-gray-900 w-60 py-4 px-4 fixed overflow-y-scroll h-full left-0 top-0 z-40 min-h-screen'
          : 'bg-gray-900 w-60 py-4 px-4 fixed overflow-y-scroll h-full left-0 top-0 scroll-hide z-40 min-h-screen'
      }>
      <ul className="text-white pt-2 flex-column text-center mt-20">
        <Link
          to="/"
          className={
            current.home
              ? 'cursor-pointer mt-1 flex p-1 rounded-2xl bg-gray-600'
              : 'cursor-pointer mt-1 flex p-1 rounded-2xl hover:bg-gray-600'
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={current.home ? 'white' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-2 mr-4">
            <path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z" />
          </svg>
          Home
        </Link>
        {!isAuth.data && (
          <div className="mt-12">
            <h5>Sign in to like videos, comment and subscribe.</h5>
            <Link
              to="/sign_in/"
              className="flex text-blue-600 font-bold items-center py-1 px-2 border-gray-700 border-2 rounded-2xl cursor-pointer hover:bg-gray-700">
              <img className="h-8 rounded-3xl cursor-pointer mr-2" src={signInSvg} alt="error" />
              Sign In
            </Link>
          </div>
        )}
        {isAuth.data && (
          <Link
            to="/subscriptions/"
            className={
              current.subs
                ? 'cursor-pointer mt-4 flex p-1 rounded-2xl bg-gray-600'
                : 'cursor-pointer mt-4 flex p-1 rounded-2xl hover:bg-gray-600'
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={current.subs ? 'white' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2 mr-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            Subscriptions
          </Link>
        )}
      </ul>
      {isAuth.data && (
        <>
          <ul className="text-white  mt-4  flex-column text-center">
            <Link
              to="/upload/"
              className={
                current.upload
                  ? 'cursor-pointer mt-4 flex p-1 rounded-2xl bg-gray-600'
                  : 'cursor-pointer mt-4 flex p-1 rounded-2xl hover:bg-gray-600'
              }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2 mr-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload video
            </Link>
            <Link
              to="/liked/"
              className="cursor-pointer mt-4 flex p-1 rounded-2xl hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={current.liked ? 'white' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2 mr-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              Liked videos
            </Link>
          </ul>
          <ul className="text-white border-t mt-4 border-gray-400 flex-column text-center">
            <h5 className="text-2xl mt-2">Subscriptions</h5>
            {channels.map((item) => {
              return (
                <Link
                  to={`/channel_details/${item.id}`}
                  key={item.id + item.name + item.image}
                  className="cursor-pointer mt-4 flex text-xl font-bold p-1 rounded-2xl hover:bg-gray-600">
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt="error"
                    className="w-8 h-8 rounded-3xl mr-3 ml-2"
                  />
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
