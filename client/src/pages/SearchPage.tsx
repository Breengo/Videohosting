import axios from "../axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchIsAuth } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { IVideoInfo } from "../components/RecomendedVideos";
import VideoBox3 from "../components/VideoBox3";

import filterSVG from "../assets/images/sort.svg";
import notFoundSVG from "../assets/images/tv.svg";

export default function SearchPage() {
  const searched = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [videoList, setVideoList] = React.useState<IVideoInfo[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState("Newest");

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(fetchIsAuth(token));
    }
    axios
      .post(`/video/find_video`, {
        searchText: searched.request,
        filter: "Newest",
      })
      .then((res) => setVideoList(res.data));
  }, [searched]);

  if (!videoList[0]) {
    return (
      <div className="flex items-center justify-center w-full bg-gray-900 h-screen flex-col pb-32 col-span-4 pl-24">
        <img className="h-36 " src={notFoundSVG} alt="error" />
        <h2 className="text-white font-bold text-2xl">Not found</h2>
      </div>
    );
  }

  function handleChoicedFilter(filter: string) {
    axios
      .post(`/video/find_video`, {
        searchText: searched.request,
        filter,
      })
      .then((res) => setVideoList(res.data));
    setCurrentFilter(filter);
    setShowFilters(false);
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 pt-24">
      <div className="flex justify-center w-full">
        <div
          onClick={() => (!showFilters ? setShowFilters(true) : "")}
          className="w-6/12 border-b-2 border-gray-700 flex items-center cursor-pointer hover:bg-gray-500 rounded-xl relative"
        >
          <img className="h-8 m-2" src={filterSVG} alt="error" />
          <h5 className="text-white font-bold">Filters</h5>
          {showFilters && (
            <div className="bg-gray-800 w-full text-white absolute top-0 rounded-xl border-2 border-gray-700 z-10">
              <h2
                className={
                  currentFilter === "Newest"
                    ? "p-4 bg-gray-900 font-bold rounded-t-xl"
                    : "p-4 hover:font-bold rounded-t-xl"
                }
                onClick={() => handleChoicedFilter("Newest")}
              >
                Newest
              </h2>
              <h2
                className={
                  currentFilter === "Oldest"
                    ? "p-4 bg-gray-900 font-bold"
                    : "p-4 hover:font-bold"
                }
                onClick={() => handleChoicedFilter("Oldest")}
              >
                Oldest
              </h2>
              <h2
                className={
                  currentFilter === "Views"
                    ? "p-4 bg-gray-900 font-bold rounded-b-xl"
                    : "p-4 hover:font-bold rounded-b-xl"
                }
                onClick={() => handleChoicedFilter("Views")}
              >
                Views
              </h2>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          showFilters
            ? "flex-col flex justify-center items-center w-full mt-32 transition-all"
            : "flex-col flex justify-center items-center w-full transition-all"
        }
      >
        {videoList.map((item) => {
          return <VideoBox3 {...item} />;
        })}
      </div>
    </div>
  );
}
