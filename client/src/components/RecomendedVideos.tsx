import axios from "../axios";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import VideoBox from "./VideoBox";
import VideoBoxSkeleton from "./VideoBoxSkeleton";
import noVideosSVG from "../assets/images/tv.svg";

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
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
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

  if (!videoList[0]) {
    return (
      <div className="flex items-center justify-center w-full bg-gray-900 h-screen flex-col pb-32 col-span-4 pl-24">
        <img className="h-36 " src={noVideosSVG} alt="error" />
        <h2 className="text-white font-bold text-2xl">
          There is no video, be the first to upload it
        </h2>
      </div>
    );
  }

  return (
    <section
      className={
        sideBarState
          ? "pt-28 xl:ml-60 xl:pl-6 bg-gray-900 grid 2xl:grid-cols-4 min-h-screen auto-rows-min xl:grid-cols-3 md:grid-cols-2 flex flex-col ml-0"
          : "pt-28 xl:ml-20 xl:pl-6 bg-gray-900 grid 2xl:grid-cols-4 min-h-screen auto-rows-min xl:grid-cols-3 md:grid-cols-2 flex flex-col ml-0"
      }
    >
      {videoList[0] &&
        videoList.map((item) => {
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
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <VideoBoxSkeleton key={item} />
        ))}
    </section>
  );
};

export default RecomendedVideos;
