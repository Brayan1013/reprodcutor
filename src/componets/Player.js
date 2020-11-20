import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { updateListToActiveSong } from '../helpers/UpdateListToActiveSong';
import { SongUpdated } from '../helpers/SongUpdated';

export const Player = ({
  isPlaying,
  setIsPlaying,
  setSongInfo,
  audioRef,
  songInfo,
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
}) => {
  //handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  //useEfects

  useEffect(() => {
    if (songInfo.currentTime === songInfo.duration && isPlaying) {
      console.log('Im executing');
      handleNextSong();
    }
  }, [songInfo.currentTime, isPlaying, songInfo.duration]);

  //controls
  const handleNextSong = async () => {
    let indexCurrentSong = songs.indexOf(currentSong);
    if (indexCurrentSong < songs.length - 1) {
      const nextSong = songs[indexCurrentSong + 1];
      //update list of songs
      const updateList = updateListToActiveSong(songs, nextSong);
      await setSongs(updateList);
      //past updated song to current
      const songUpdated = SongUpdated(updateList, nextSong);
      await setCurrentSong(songUpdated[0]);
      if (isPlaying) {
        audioRef.current.play();
      }
    } else {
      console.log('There are no more songs');
      setIsPlaying(false);
    }
  };

  const handleBeforeSong = async () => {
    const indexCurrentSong = songs.indexOf(currentSong);
    if (indexCurrentSong > 0) {
      const beforeSong = songs[indexCurrentSong - 1];
      //update list of songs
      const updateList = updateListToActiveSong(songs, beforeSong);
      await setSongs(updateList);
      //past updated song to current
      const songUpdated = SongUpdated(updateList, beforeSong);
      await setCurrentSong(songUpdated[0]);
      if (isPlaying) {
        audioRef.current.play();
      }
    } else {
      console.log('There are no more songs');
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={handleBeforeSong}
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={handleNextSong}
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
