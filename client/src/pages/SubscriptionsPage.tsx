import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { resetAll, setSubs } from "../redux/slices/currentPageSlice";

import SidebarSmall from "../components/SidebarSmall";
import axios from "../axios";
import { IVideoInfo } from "../components/RecomendedVideos";
import { fetchIsAuth } from "../redux/slices/authSlice";
import VideoBox4 from "../components/VideoBox4";
import dateComparator from "../utils/dateComparator";

import noSubsSVG from "../assets/images/tv.svg";

const SubscriptionsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sideBarState = useSelector((state: RootState) => state.sideBar.show);
  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);

  React.useEffect(() => {
    dispatch(resetAll());
    dispatch(setSubs());
    const token = window.localStorage.getItem("token");
    if (token) dispatch(fetchIsAuth(token));
    axios
      .get("/video/subscription_videos", {
        headers: {
          auth: token,
        },
      })
      .then((res) => setVideoList(res.data));
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
      {!sideBarState && <SidebarSmall />}
      <div
        className={
          sideBarState && videoList[0]
            ? "ml-60 h-full flex justify-center"
            : "ml-20 h-full flex justify-center"
        }
      >
        {!videoList[0] && (
          <div className="flex items-center justify-center w-full h-full flex-col pb-32">
            <img className="h-36 " src={noSubsSVG} alt="error" />
            <h2 className="text-white font-bold text-2xl">
              You don't have any subscriptions
            </h2>
          </div>
        )}
        {videoList[0] && (
          <div className="pt-24 justify-center flex-col pl-6 w-10/12">
            <h1 className="text-white font-bold text-3xl h-fit text-left pb-2 border-gray-600 border-b-2">
              Subscriptions
            </h1>
            <div className="flex flex-wrap justify-center p-2">
              {videoList
                .sort(
                  (first, second) =>
                    dateComparator(first.createdAt) -
                    dateComparator(second.createdAt)
                )
                .map((item) => {
                  {
                    return <VideoBox4 key={item.id + item.title} {...item} />;
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
