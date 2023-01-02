import { Link } from 'react-router-dom';
import dateConverter from '../utils/dateConverter';
import { IVideoInfo } from './RecomendedVideos';

const VideoBox3: React.FC<IVideoInfo> = ({ ...videoInfo }) => {
  return (
    <Link
      to={`/video/${videoInfo.id}`}
      className="flex text-gray-300 mt-2 hover:bg-gray-700 cursor-pointer p-4 rounded-xl w-6/12">
      <video className="w-96 rounded-2xl" src={`http://localhost:3001/${videoInfo.video}`} />
      <div className="ml-2 mt-2">
        <h1 className="font-bold text-white">{videoInfo.title}</h1>
        <h3 className="my-2 relative">
          {videoInfo.views} views <span className="text-3xl ml-1 bottom-1 absolute">.</span>
          <span className="ml-4">{dateConverter(videoInfo.createdAt)}</span>
        </h3>
        <div className="flex-row flex items-center my-2">
          <div className="h-12 w-12 rounded-full flex-row flex items-center justify-center overflow-hidden relative mr-4">
            <img
              className="h-12 min-w-max"
              src={`http://localhost:3001/${videoInfo.User.image}`}
              alt="error"
            />
          </div>
          <h3>{videoInfo.User.name}</h3>
        </div>
        <p className="break-all flex-wrap w-full">{videoInfo.description.slice(0, 200)}...</p>
      </div>
    </Link>
  );
};

export default VideoBox3;
