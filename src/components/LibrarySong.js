import React from "react"
import {playAudio} from './util'
const LibrarySong = ( {song,songs,setCurrentSong,id,audioRef,isPlaying,setSongs} ) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        const newSongs = songs.map((song)=>{
            if(song.id === id) {
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
        playAudio(isPlaying,audioRef);
    };
    return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected':'' }`}>
      <img alt="photoalbum" src={song.cov}/>
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
    </div>
  );
};

export default LibrarySong;
