import React from 'react';
import { SongUpdated } from '../helpers/SongUpdated';
import { updateListToActiveSong } from '../helpers/UpdateListToActiveSong';

export const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) => {
  //handler click
  const handleSongSelected = async (songSelected) => {
    const updateList = updateListToActiveSong(songs, songSelected);
    await setSongs(updateList);
    const songUpdated = SongUpdated(updateList, songSelected);
    await setCurrentSong(songUpdated[0]);
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <div
      onClick={() => handleSongSelected(song)}
      className={`library-container ${song.active ? 'selected' : ''}`}
    >
      <div className="song-image">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="song-info">
        <h1>{song.name}</h1>
        <h2>{song.artist}</h2>
      </div>
    </div>
  );
};
