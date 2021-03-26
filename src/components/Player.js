import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import userEvent from "@testing-library/user-event";
const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  const dragHandler = (e) =>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const getTime = (time) =>{
    return(
      Math.floor(time/60)+":"+("0"+Math.floor(time %60)).slice(-2)
    );
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>
          {getTime(songInfo.currentTime)}
        </p>
        <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
        <input 
        min={0}
        max={songInfo.duration} 
        onChange={dragHandler} 
        value={songInfo.currentTime}
        type="range" />
        <p>{getTime(songInfo.duration - songInfo.currentTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      
    </div>
  );
};

export default Player;
