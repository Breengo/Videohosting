import preview from '../assets/images/Preview.jpg';

const VideoBox2 = () => {
  return (
    <div className="flex cursor-pointer hover:bg-gray-700 p-4 rounded-xl">
      <img className="h-32 rounded-2xl" src={preview} alt="error" />
      <div className="ml-3">
        <h3 className="text-white text-lg font-bold w-fit">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h3>
        <h4 className="text-gray-400 mt-2 w-fit">Author</h4>
        <h4 className="text-gray-400 relative w-fit block">
          188K views <span className="absolute bottom-1 ml-1 text-3xl">.</span>{' '}
          <span className="ml-4">1 year ago</span>
        </h4>
      </div>
    </div>
  );
};

export default VideoBox2;
