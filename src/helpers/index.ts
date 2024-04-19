import type { EpisodeStatus, IEpisode } from '@/interfaces'

export const setEpisodeToLocalStorage = (
  episode: IEpisode,
  status?: EpisodeStatus | undefined,
  toggleFavorite?: boolean
) => {
  const episodesStorage: IEpisode[] = JSON.parse(localStorage.getItem('episodes') || '[]')
  const existingEpisodeIndex = episodesStorage.findIndex(
    (storedEpisode) => storedEpisode.id === episode.id
  )

  if (existingEpisodeIndex !== -1) {
    if (status !== undefined) {
      episodesStorage[existingEpisodeIndex].status = status
    }
    if (toggleFavorite) {
      episodesStorage[existingEpisodeIndex].isFavorite =
        !episodesStorage[existingEpisodeIndex].isFavorite
    }
  } else {
    const newEpisode = { ...episode }
    if (status !== undefined) {
      newEpisode.status = status
    }
    if (toggleFavorite) {
      newEpisode.isFavorite = true
    }
    episodesStorage.push(newEpisode)
  }

  localStorage.setItem('episodes', JSON.stringify(episodesStorage))
}
