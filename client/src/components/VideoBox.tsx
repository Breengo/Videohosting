import { Link } from 'react-router-dom';
import dateConverter from '../utils/dateConverter';

interface IVideoProps {
  video: string;
  title: string;
  views: number;
  authorName: string;
  authorAvatar: string;
  uploadDate: string;
  id: number;
}

const VideoBox: React.FC<IVideoProps> = ({
  video,
  title,
  views,
  authorName,
  authorAvatar,
  uploadDate,
  id,
}) => {
  return (
    <Link
      to={`/video/${id}`}
      className="mb-4 mx-2 cursor-pointer hover:bg-gray-800 p-4 rounded-xl flex-col flex h-fit">
      <video className=" min-h-60 rounded-xl" src={`http://localhost:3001/${video}`} />
      <div className="flex">
        <img
          className="h-10 rounded-3xl mt-2 ml-1 mr-2"
          src={`http://localhost:3001/${authorAvatar}`}
          alt="error"
        />
        <div className="flex-column">
          <h3 className="mt-2 text-white text-3xl">{title}</h3>
          <h4 className="text-gray-300">{authorName}</h4>
          <h5 className="text-gray-300 flex">
            {views} views
            <span className="flex items-center justify-center w-1 h-2 text-3xl mx-2">.</span>
            {dateConverter(uploadDate)}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default VideoBox;
