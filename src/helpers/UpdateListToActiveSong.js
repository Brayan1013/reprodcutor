export const updateListToActiveSong = (songs, currentSong) => {
  return songs.map((song) => {
    if (song.id === currentSong.id) {
      return { ...song, active: true };
    } else {
      return { ...song, active: false };
    }
  });
};
