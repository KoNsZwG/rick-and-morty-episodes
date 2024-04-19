import { ref, computed } from 'vue'
import axios from 'axios'
import { EpisodeStatus } from '@/interfaces'
import type { IEpisode, IApiResponse, IEpisodeCharacterResponse } from '@/interfaces'
import { defineStore } from 'pinia'
import { setEpisodeToLocalStorage } from '@/helpers'

export const useEpisodeStore = defineStore('episode', () => {
  const episodes = ref<IEpisode[]>([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const nextPageUrl = ref('')
  const currentFilter = ref('all')

  const setFilter = (filter: EpisodeStatus | 'all') => {
    currentFilter.value = filter
  }

  const filteredEpisodes = computed(() => {
    switch (currentFilter.value) {
      case 'watched':
        return episodes.value.filter((episode) => episode.status === 'watched')
      case 'unwatched':
        return episodes.value.filter((episode) => episode.status === 'unwatched')
      case 'watching':
        return episodes.value.filter((episode) => episode.status === 'watching')
      default:
        return episodes.value
    }
  })

  const generateRandomNumber = (arr: string[]): number => {
    const randomIndex = Math.floor(Math.random() * arr.length)

    return arr.length === 0 ? 0 : randomIndex
  }

  const fetchEpisodes = async () => {
    try {
      isLoading.value = true
      const response = await axios.get<IApiResponse>(
        `https://rickandmortyapi.com/api/episode?page=${currentPage.value}`
      )

      // Getting episodes from local storage and setting them after convering to object.
      const episodesStorage: IEpisode[] = JSON.parse(localStorage.getItem('episodes') || '[]')

      episodes.value = await fetchNormalizedEpisodes(response.data, episodesStorage)

      totalPages.value = response.data.info.pages
      nextPageUrl.value = response.data.info.next || ''
    } catch (error) {
      console.error('Error fetching episodes:', error)
      console.error('Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchNormalizedEpisodes = async (
    responseData: IApiResponse,
    episodeStorage?: IEpisode[]
  ): Promise<IEpisode[]> => {
    return await Promise.all(
      responseData.results.map(async (apiEpisode) => {
        let storedEpisode: IEpisode | undefined
        if (episodeStorage) {
          storedEpisode = episodeStorage.find((storedEpisode) => storedEpisode.id === apiEpisode.id)
        } else {
          storedEpisode = episodes.value.find((storedEpisode) => storedEpisode.id === apiEpisode.id)
        }

        const characterImage = await fetchRandomCharacterImage(apiEpisode.characters)
        if (storedEpisode) {
          return {
            ...apiEpisode,
            isFavorite: storedEpisode.isFavorite,
            status: storedEpisode.status,
            characterImage
          }
        } else {
          return {
            ...apiEpisode,
            isFavorite: false,
            status: EpisodeStatus.Unwatched,
            characterImage
          }
        }
      })
    )
  }

  const fetchNextPage = async () => {
    if (!nextPageUrl.value) return

    try {
      isLoadingMore.value = true
      const response = await axios.get<IApiResponse>(nextPageUrl.value)
      const newEpisodes: IEpisode[] = await fetchNormalizedEpisodes(response.data)

      episodes.value = [...episodes.value, ...newEpisodes]
      currentPage.value++
      totalPages.value = response.data.info.pages
      nextPageUrl.value = response.data.info.next || ''
      isLoadingMore.value = false
    } catch (error) {
      console.error('Error:', error)
      isLoadingMore.value = false
    }
  }

  const fetchRandomCharacterImage = async (characters: string[]): Promise<string> => {
    const randomNumber = generateRandomNumber(characters)
    const characterResponse = await axios.get<IEpisodeCharacterResponse>(characters[randomNumber])

    return characterResponse.data.image
  }

  const updateEpisode = (episode: IEpisode, status: EpisodeStatus, toggleFavorite: boolean) => {
    setEpisodeToLocalStorage(episode, status, toggleFavorite)
  }

  const updateEpisodeStatus = (episode: IEpisode, status: EpisodeStatus) => {
    const updatedEpisode = { ...episode, status }
    const updatedEpisodes = episodes.value.map((ep) => (ep.id === episode.id ? updatedEpisode : ep))
    episodes.value = updatedEpisodes
    setEpisodeToLocalStorage(episode, status)
  }

  const updateToggleFavorite = (episode: IEpisode) => {
    const updatedEpisode = { ...episode, isFavorite: !episode.isFavorite }
    const updatedEpisodes = episodes.value.map((ep) => (ep.id === episode.id ? updatedEpisode : ep))

    episodes.value = updatedEpisodes
    setEpisodeToLocalStorage(episode, undefined, !episode.isFavorite)
  }

  return {
    episodes,
    currentPage,
    totalPages,
    isLoading,
    isLoadingMore,
    filteredEpisodes,
    fetchEpisodes,
    fetchNextPage,
    updateEpisode,
    updateEpisodeStatus,
    updateToggleFavorite,
    setFilter,
    currentFilter,
    nextPageUrl
  }
})
