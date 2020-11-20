import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export const Song = ({
  currentSong,
  setShowLibrary,
  showLibrary,
  isPlaying,
}) => {
  //handle click
  const handleShowLibrary = () => {
    setShowLibrary((previuosState) => !previuosState);
  };
  return (
    <div className="song-container">
      <div className="show-library">
        <button onClick={handleShowLibrary}>
          <FontAwesomeIcon
            icon={faMusic}
            size="1x"
            style={{ marginRight: '5' }}
          />
          {showLibrary ? 'Hide library' : 'Show library'}
        </button>
      </div>
      <img
        className={isPlaying ? 'rotate' : ''}
        src={currentSong.cover}
        alt="song cover"
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};
