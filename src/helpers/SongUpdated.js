export const SongUpdated = (updatedList, currentSong) => {
  return updatedList.filter((song) => song.id === currentSong.id);
};
