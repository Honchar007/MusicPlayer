import React from "react"


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
        if(isPlaying)
        {
            const playPromise = audioRef.current.play();
            if(playPromise!== undefined)
            {
                playPromise.then((audio)=>{
                    audioRef.current.play();
                })
            }
        }
    }
    return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected':'' }`}>
      <img alt="photoalbum" src={song.cov}/>
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
    </div>
  );
};

export default LibrarySong;