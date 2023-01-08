import axios from "../axios";
import React from "react";
import { useDispatch } from "react-redux";
import { resetAll, setLiked } from "../redux/slices/currentPageSlice";
import { AppDispatch } from "../redux/store";
import { fetchIsAuth } from "../redux/slices/authSlice";
import { IVideoInfo } from "../components/RecomendedVideos";
import VideoBox3 from "../components/VideoBox3";

import noLikedSVG from "../assets/images/tv.svg";

const LikedVideosPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetAll());
    dispatch(setLiked());
    const token = window.localStorage.getItem("token");
    if (token) dispatch(fetchIsAuth(token));
    axios
      .get("/video/liked_videos/", { headers: { auth: token } })
      .then((res) => setVideoList(res.data));
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center pt-24">
      {!videoList[0] && (
        <div className="flex items-center justify-center w-full h-full flex-col pb-48">
          <img className="h-36 " src={noLikedSVG} alt="error" />
          <h2 className="text-white font-bold text-2xl">
            You don't have any liked videos
          </h2>
        </div>
      )}
      {videoList[0] && (
        <>
          {" "}
          <h1 className="w-6/12 text-white font-bold text-xl border-b-2 border-gray-500 pb-1">
            Liked videos
          </h1>
          <div className="flex-col flex justify-center items-center w-full mb-8">
            {videoList.map((item) => {
              return <VideoBox3 {...item} />;
            })}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default LikedVideosPage;
