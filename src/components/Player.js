import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({ currentSong, isPlaying, setIsPlaying,audioRef,setSongInfo,songInfo,songs,setCurrentSong}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const skipTrackHandler = (direction) =>{
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip-forward')
    {
      setCurrentSong(songs[(currentIndex+1) % songs.length]);
    }
    else{
      if((currentIndex-1) % songs.length === -1)
        setCurrentSong(songs[songs.length-1]);
      else
      setCurrentSong(songs[(currentIndex-1) % songs.length]);
        
    }
  }
  const dragHandler = (e) =>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }
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
        <input 
        min={0}
        max={songInfo.duration || 0} 
        onChange={dragHandler} 
        value={songInfo.currentTime}
        type="range" />
        <p>{getTime(songInfo.duration - songInfo.currentTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          className="skip-back"
          onClick={()=>skipTrackHandler("skip-back")}
          size="2x" 
          icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={()=>skipTrackHandler("skip-forward")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
      
    </div>
  );
};

export default Player;
