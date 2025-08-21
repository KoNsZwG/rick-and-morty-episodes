// src/stores/episodeStore.ts

import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { EpisodeStatus } from '@/interfaces'
import type { IEpisode, IApiResponse, IEpisodeCharacterResponse } from '@/interfaces'

export const useEpisodeStore = defineStore('episode', () => {
  // =================================================================
  // ===== STATE (The single source of truth for your app's data) =====
  // =================================================================
  const episodes = ref<IEpisode[]>([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const nextPageUrl = ref<string | null>(null)
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const currentFilter = ref<EpisodeStatus | 'all'>('all')

  // =================================================================
  // ===== GETTERS (Computed properties for your state) =============
  // =================================================================
  const filteredEpisodes = computed(() => {
    if (currentFilter.value === 'all') {
      return episodes.value
    }
    return episodes.value.filter((episode) => episode.status === currentFilter.value)
  })

  // =================================================================
  // ===== HELPER FUNCTIONS (Internal logic for the store) =========
  // =================================================================
  const generateRandomNumber = (arr: string[]): number => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr.length === 0 ? 0 : randomIndex
  }

  const fetchRandomCharacterImage = async (characters: string[]): Promise<string> => {
    // Edge case: If an episode has no characters, return a placeholder
    if (characters.length === 0) {
      // You can replace this with a local asset path if you have one
      return 'https://rickandmortyapi.com/api/character/avatar/19.jpeg' // Default to Mr. Poopybutthole
    }
    const randomNumber = generateRandomNumber(characters)
    const characterResponse = await axios.get<IEpisodeCharacterResponse>(characters[randomNumber])
    return characterResponse.data.image
  }

  // =================================================================
  // ===== ACTIONS (Functions that change the state) ================
  // =================================================================
  const fetchEpisodes = async () => {
    // Don't fetch if we are already loading
    if (isLoading.value) return

    try {
      isLoading.value = true
      // 1. Get raw episode data from the API
      const response = await axios.get<IApiResponse>(
        `https://rickandmortyapi.com/api/episode?page=${currentPage.value}`
      )
      const apiEpisodes = response.data.results

      // 2. Get saved user data from local storage
      const storedEpisodes: { id: number; status: EpisodeStatus; isFavorite: boolean }[] =
        JSON.parse(localStorage.getItem('episodes') || '[]')

      // 3. Merge API data with stored user data
      const mergedEpisodes = await Promise.all(
        apiEpisodes.map(async (apiEpisode) => {
          const storedData = storedEpisodes.find((s) => s.id === apiEpisode.id)
          const characterImage = await fetchRandomCharacterImage(apiEpisode.characters)

          return {
            ...apiEpisode,
            characterImage,
            status: storedData?.status || EpisodeStatus.Unwatched,
            isFavorite: storedData?.isFavorite || false
          }
        })
      )

      // 4. Append new episodes to the existing list (for infinite scroll)
      episodes.value = [...episodes.value, ...mergedEpisodes]

      totalPages.value = response.data.info.pages
      nextPageUrl.value = response.data.info.next
    } catch (error) {
      console.error('Error fetching episodes:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchInitialEpisodes = async () => {
    // Reset state for a fresh load or filter change
    console.log('fetchInitialEpisodes action has been called!')
    episodes.value = []
    currentPage.value = 1
    await fetchEpisodes()
  }

  const fetchNextPage = async () => {
    if (!nextPageUrl.value || isLoadingMore.value) return

    isLoadingMore.value = true
    currentPage.value++ // Increment the page before fetching
    await fetchEpisodes() // Re-use the main fetch logic
    isLoadingMore.value = false
  }

  const setFilter = (filter: EpisodeStatus | 'all') => {
    currentFilter.value = filter
  }

  const updateEpisodeStatus = (episodeId: number, status: EpisodeStatus) => {
    const episode = episodes.value.find((ep) => ep.id === episodeId)
    if (episode) {
      episode.status = status
      // The Pinia plugin handles saving automatically!
    }
  }

  const updateToggleFavorite = (episodeId: number) => {
    const episode = episodes.value.find((ep) => ep.id === episodeId)
    if (episode) {
      episode.isFavorite = !episode.isFavorite
      // The Pinia plugin handles saving automatically!
    }
  }

  // =================================================================
  // ===== RETURN (Expose state and actions to components) =========
  // =================================================================
  return {
    // State
    episodes,
    currentPage,
    totalPages,
    isLoading,
    isLoadingMore,
    currentFilter,
    nextPageUrl,
    // Getters
    filteredEpisodes,
    // Actions
    fetchInitialEpisodes,
    fetchNextPage,
    updateEpisodeStatus,
    updateToggleFavorite,
    setFilter
  }
})
