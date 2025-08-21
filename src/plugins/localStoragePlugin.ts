// src/plugins/localStoragePlugin.ts
import type { PiniaPluginContext } from 'pinia'

// We define what we want to save from our state
interface IEpisodeToStore {
  id: number
  status: 'watched' | 'unwatched' | 'watching'
  isFavorite: boolean
}

export const localStoragePlugin = (context: PiniaPluginContext) => {
  // This function is called whenever the state changes
  context.store.$subscribe((mutation, state) => {
    // We only care about the 'episode' store
    if (mutation.storeId === 'episode') {
      // Create a simplified array for storage
      const episodesToStore: IEpisodeToStore[] = state.episodes.map((ep: any) => ({
        id: ep.id,
        status: ep.status,
        isFavorite: ep.isFavorite
      }))

      // Save the simplified array to localStorage
      localStorage.setItem('episodes', JSON.stringify(episodesToStore))
    }
  })
}
