import React from 'react';
import { LibrarySong } from './LibrarySong';

export const SideBar = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  showLibrary,
}) => {
  return (
    <>
      {showLibrary && (
        <div className="sidebar">
          <h1 className="title-library">Library</h1>
          {songs.map((song) => (
            <LibrarySong
              audioRef={audioRef}
              setCurrentSong={setCurrentSong}
              song={song}
              key={song.id}
              isPlaying={isPlaying}
              songs={songs}
              setSongs={setSongs}
            />
          ))}
        </div>
      )}
    </>
  );
};
