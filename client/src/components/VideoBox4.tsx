import dateConverter from "../utils/dateConverter";
import { IVideoInfo } from "./RecomendedVideos";
import { Link } from "react-router-dom";

const VideoBox4: React.FC<IVideoInfo> = ({ ...videoInfo }) => {
  return (
    <Link
      to={`/video/${videoInfo.id}`}
      className="rounded-xl hover:bg-gray-700 cursor-pointer p-4 w-1/4 box-border"
    >
      <video
        className="rounded-xl w-72"
        src={`http://localhost:3001/${videoInfo.video}`}
      />
      <h1 className="text-white text-2xl font-bold ml-2">{videoInfo.title}</h1>
      <h2 className="text-gray-400 text-xl ml-2">{videoInfo.User.name}</h2>
      <h2 className="text-gray-400 relative ml-2">
        {videoInfo.views} views{" "}
        <span className="absolute bottom-1 ml-1 text-2xl">.</span>{" "}
        <span className="ml-4">{dateConverter(videoInfo.createdAt)}</span>
      </h2>
    </Link>
  );
};

export default VideoBox4;
