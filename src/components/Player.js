import React, {useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "./util"; 
const Player = ({ currentSong, isPlaying, setIsPlaying,audioRef,setSongInfo,songInfo,songs,setCurrentSong,setSongs}) => {
  //UseEffect
  useEffect(()=>{
    const newSongs = songs.map((song)=>{
      if(song.id === currentSong.id) {
          return{
              ...song,active:true,
          }
      }
      else{
          return{
              ...song,active:false,
          }
      }
  });
  setSongs(newSongs);
  },[currentSong]);
  //event handlers
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
    playAudio(isPlaying,audioRef);
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
  const trackAnim = {
    transform: `translateX:(${songInfo.animationPercentage}%) `,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>
          {getTime(songInfo.currentTime)}
        </p>
        <div className="track">
        <input 
        min={0}
        max={songInfo.duration || 0} 
        onChange={dragHandler} 
        value={songInfo.currentTime}
        type="range" 
          className="slider"
        />
        <div style={{transform:`translateX:(${songInfo.animationPercentage}%) !important`}} className="animate-track" >
        </div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration - songInfo.currentTime):'0:00'}</p>
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
