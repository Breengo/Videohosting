import React from 'react';
import timeConverter from '../utils/timeConverter';

import fullscreen from '../assets/images/fullscreen.svg';
import play from '../assets/images/play.svg';
import settings from '../assets/images/settings.svg';
import sound from '../assets/images/sound.svg';
import subs from '../assets/images/subs.svg';
import fullWidth from '../assets/images/width.svg';
import pause from '../assets/images/pause.svg';
import muteSvg from '../assets/images/mute.svg';

interface IVideo {
  video: string;
}

const VideoPlayer: React.FC<IVideo> = ({ video }) => {
  const [videoState, setVideoState] = React.useState(false);
  const [mute, setMute] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);

  const progressRef = React.useRef<HTMLDivElement>(null);
  const fullProgressRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const divSoundRef = React.useRef<HTMLDivElement>(null);
  const inpSoundRef = React.useRef<HTMLInputElement>(null);

  function playHandler() {
    if (!videoState) {
      videoRef.current?.play();
      setVideoState(true);
    } else {
      videoRef.current?.pause();
      setVideoState(false);
    }
  }

  setTimeout(() => setIsReady(true), 300);

  function handleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current?.muted;
      setMute(videoRef.current.muted);
    }
  }

  function handleProgress() {
    if (videoRef.current?.duration) {
      setProgress((videoRef.current?.currentTime / videoRef.current?.duration) * 100);
      setTime(Math.round(videoRef.current.currentTime));
    }
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }

  function onProgressBarClick(e: React.MouseEvent<HTMLInputElement>) {
    if (progressRef.current && videoRef.current && fullProgressRef.current) {
      videoRef.current.currentTime =
        (e.nativeEvent.offsetX / fullProgressRef.current.offsetWidth) * videoRef.current.duration;
      handleProgress();
    }
  }

  function onSoundBarClick(e: React.MouseEvent<HTMLInputElement>) {
    if (divSoundRef.current && inpSoundRef.current && videoRef.current) {
      divSoundRef.current.style.width = `${inpSoundRef.current?.value}%`;
      videoRef.current.volume = Number(inpSoundRef.current.value) / 100;
    }
  }

  return (
    <div className="relative flex justify-center z-0">
      <video
        onTimeUpdate={handleProgress}
        ref={videoRef}
        className="w-full"
        src={`http://localhost:3001/${video}`}
      />
      <div ref={fullProgressRef} className="absolute bottom-0 mb-12 w-full bg-gray-300 h-2 z-10">
        <div ref={progressRef} className="bg-red-900 h-2 w-0 cursor-pointer z-10"></div>
        <input
          onClick={(e) => {
            onProgressBarClick(e);
          }}
          type="range"
          className="w-full h-full absolute bottom-0 opacity-0 cursor-pointer"
        />
      </div>
      <div className="absolute flex bottom-0   items-center w-full">
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        {videoState ? (
          <img
            className="h-10 cursor-pointer ml-4 z-10"
            onClick={playHandler}
            src={pause}
            alt="error"
          />
        ) : (
          <img
            className="h-10 cursor-pointer ml-4 z-10"
            onClick={playHandler}
            src={play}
            alt="error"
          />
        )}
        <span className="text-white mx-2 z-10">
          {timeConverter(time)}/
          {videoRef.current && isReady && timeConverter(Math.round(videoRef.current?.duration))}
        </span>
        {mute ? (
          <img
            className="h-8 ml-8 cursor-pointer z-10"
            src={muteSvg}
            onClick={handleMute}
            alt="error"
          />
        ) : (
          <img
            className="h-8 ml-8 cursor-pointer z-10"
            src={sound}
            onClick={handleMute}
            alt="error"
          />
        )}
        <div className="w-30 h-fit flex items-center ml-4 bg-gray-800 z-10 p-0 cursor-pointer relative rounded-xl">
          <div
            ref={divSoundRef}
            className="absolute bottom-0 h-full w-full bg-white rounded-xl"></div>
          <input
            max={100}
            min={0}
            ref={inpSoundRef}
            onClick={onSoundBarClick}
            type="range"
            className="w-full h-2 cursor-pointer z-10 opacity-0"
          />
        </div>
        <div className="flex items-center justify-end w-full">
          <img className="h-8 cursor-pointer mr-4 z-10" src={subs} alt="error" />
          <img className="h-8 cursor-pointer mr-4 z-10" src={settings} alt="error" />
          <img className="h-6 cursor-pointer mr-4 z-10" src={fullWidth} alt="error" />
          <img
            onClick={() => videoRef.current?.requestFullscreen()}
            className="h-12 cursor-pointer mr-4 z-10"
            src={fullscreen}
            alt="error"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
