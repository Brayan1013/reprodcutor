import React, { useState, useRef } from 'react';
import { Player } from './componets/Player';
import { SideBar } from './componets/SideBar';
import { Song } from './componets/Song';
import data from './utils';

export const App = () => {
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //handlers
  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <div className="app">
      <div
        className={
          showLibrary ? 'container-sidebar' : 'animation-container-sidebar '
        }
      >
        <SideBar
          showLibrary={showLibrary}
          audioRef={audioRef}
          setCurrentSong={setCurrentSong}
          songs={songs}
          isPlaying={isPlaying}
          setSongs={setSongs}
        />
      </div>
      <div className="container-music">
        <Song
          setShowLibrary={setShowLibrary}
          showLibrary={showLibrary}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
        <Player
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          audioRef={audioRef}
          songInfo={songInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      </div>

      <audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};
