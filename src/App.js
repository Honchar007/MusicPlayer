import React, { useState, useRef } from 'react'
import Player from './components/Player'
import Song from './components/Song'
import './styles/app.scss'
import data from './components/data'
import Library from './components/Library'
import Nav from './components/Nav'
import {playAudio} from './components/util';
function App() {
  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const { duration } = e.target
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const roundedPercentage = Math.round((roundedCurrent/roundedDuration)*100);
    setSongInfo({ ...songInfo, currentTime: current, duration: duration ,animationPercentage:roundedPercentage});
  }
  const endSongHandler = async () =>
  {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
     await setCurrentSong(songs[(currentIndex+1) % songs.length]);
    audioRef.current.play();
  }
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        setSongs={setSongs}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={endSongHandler}
      />
    </div>
  )
}

export default App
