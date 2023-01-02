import axios from '../axios';
import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import VideoBox from './VideoBox';
import VideoBoxSkeleton from './VideoBoxSkeleton';

export interface IAuthorInfo {
  name: string;
  image: string;
  id: number;
}

export interface IVideoInfo {
  id: number;
  createdAt: string;
  description: string;
  User: IAuthorInfo;
  updatedAt: string;
  title: string;
  video: string;
  views: number;
}

const RecomendedVideos: React.FC = () => {
  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);

  const sideBarState = useSelector((state: RootState) => state.sideBar.show);

  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  React.useEffect(() => {
    if (update) {
      setIsLoading(true);
      axios
        .get(`/video/videos?offset=${currentPage}`)
        .then((res) => {
          setVideoList([...videoList, ...res.data]);
          setCurrentPage((prev) => prev + 1);
        })
        .finally(() => {
          setUpdate(false);
          setIsLoading(false);
        });
    }
  }, [update]);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setUpdate(true);
    }
  };

  return (
    <section
      className={
        sideBarState
          ? 'mt-16 ml-60 pt-8 pl-6 bg-gray-900 grid grid-cols-4 min-h-screen auto-rows-min'
          : 'mt-16 ml-20 pt-8 pl-6 bg-gray-900 grid grid-cols-4 min-h-screen auto-rows-min'
      }>
      {videoList.map((item) => {
        return (
          <VideoBox
            key={item.id + item.title}
            id={item.id}
            views={item.views}
            title={item.title}
            video={item.video}
            authorAvatar={item.User.image}
            authorName={item.User.name}
            uploadDate={item.createdAt}
          />
        );
      })}
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => <VideoBoxSkeleton key={item} />)}
    </section>
  );
};

export default RecomendedVideos;
