import React from 'react';
import axios from '../axios';

import VideoPlayer from './VideoPlayer';
import { IVideoInfo } from './RecomendedVideos';
import dateConverter from '../utils/dateConverter';
import { Link } from 'react-router-dom';

const VideoDetailsInfo: React.FC<IVideoInfo> = ({ ...videoInfo }) => {
  const [mouseOverLike, setMouseOverLike] = React.useState(false);
  const [mouseOverDislike, setMouseOverDislike] = React.useState(false);
  const [fullDescription, setFullDescription] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [subscribers, setSubscribers] = React.useState(0);
  const [liked, setLiked] = React.useState<string | null>(null);
  const [raiting, setRaiting] = React.useState({ likes: 0, dislikes: 0 });

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    axios
      .get(`/subs/isSubscribed?channelId=${videoInfo.User.id}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => setSubscribed(res.data.message));

    axios
      .get(`/like/like_info?videoId=${videoInfo.id}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => setLiked(res.data.message));

    axios
      .get(`/subs/subscribers?channelId=${videoInfo.User.id}`)
      .then((res) => setSubscribers(res.data.subscribers));

    axios.get(`/like/likes?VideoId=${videoInfo.id}`).then((res) => setRaiting(res.data));
  }, []);

  function subscribeAction() {
    const token = window.localStorage.getItem('token');
    axios
      .get(`/subs/subscribe?channelId=${videoInfo.User.id}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setSubscribed(res.data.message);
        axios
          .get(`/subs/subscribers?channelId=${videoInfo.User.id}`)
          .then((res) => setSubscribers(res.data.subscribers));
      });
  }

  function likeAction(value: 'like' | 'dislike') {
    const token = window.localStorage.getItem('token');
    axios
      .get(`/like/like?videoId=${videoInfo.id}&value=${value}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setLiked(res.data.message);
        axios.get(`/like/likes?VideoId=${videoInfo.id}`).then((res) => setRaiting(res.data));
      });
  }

  return (
    <div className="p-4">
      <VideoPlayer video={videoInfo.video} />
      <h1 className="text-white text-2xl mt-2 w-full">{videoInfo.title}</h1>
      <div className="grid grid-cols-2 pb-4">
        <div className="flex items-center">
          <Link
            to={`/channel_details/${videoInfo.User.id}`}
            className="flex hover:bg-gray-500 items-center justify-center mt-6 p-2 rounded-xl">
            <img
              className="h-12 rounded-3xl cursor-pointer"
              src={`http://localhost:3001/${videoInfo.User.image}`}
              alt="error"
            />
            <div className="cursor-pointer">
              <h3 className="text-white text-xl ml-4">{videoInfo.User.name}</h3>
              <h4 className="text-gray-300 text-xs ml-4">{subscribers} subscribers</h4>
            </div>
          </Link>
          <button
            onClick={subscribeAction}
            className={
              subscribed
                ? 'bg-gray-400 p-3 rounded-xl text-white ml-8 mt-8 hover:bg-gray-500'
                : 'bg-red-700 p-3 rounded-xl text-white ml-8 mt-8 hover:bg-red-500'
            }>
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
        <div className="flex justify-self-end items-center justify-center w-full mt-6">
          <div
            onMouseOver={() => setMouseOverLike(true)}
            onMouseLeave={() => setMouseOverLike(false)}
            onClick={() => likeAction('like')}
            className="flex text-white items-center justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={mouseOverLike || liked == 'like' ? 'white' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10 cursor-pointer mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            <span className="text-xl">{raiting.likes}</span>
          </div>
          <div
            onMouseOver={() => setMouseOverDislike(true)}
            onMouseLeave={() => setMouseOverDislike(false)}
            onClick={() => likeAction('dislike')}
            className="flex text-white items-center justify-center ml-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={mouseOverDislike || liked == 'dislike' ? 'white' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10 cursor-pointer mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              />
            </svg>
            <span className="text-xl">{raiting.dislikes}</span>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (!fullDescription) {
            setFullDescription(true);
          }
        }}
        className={
          fullDescription
            ? 'text-white bg-gray-600 p-4 rounded-xl'
            : 'text-white bg-gray-600 p-4 rounded-xl cursor-pointer hover:bg-gray-700'
        }>
        <div className="flex mb-2">
          <h4 className="font-bold">{videoInfo.views} views</h4>
          <h4 className="font-bold ml-8">{dateConverter(videoInfo.createdAt)}</h4>
        </div>
        {!fullDescription && (
          <div>
            {videoInfo.description.slice(0, 50) + '...'}
            <span className="font-bold ml-2">Show more</span>
          </div>
        )}
        {fullDescription && (
          <div>
            {videoInfo.description}
            <span
              onClick={(e) => {
                e.stopPropagation();
                setFullDescription(false);
              }}
              className="font-bold block mt-4 cursor-pointer">
              Show less
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetailsInfo;
