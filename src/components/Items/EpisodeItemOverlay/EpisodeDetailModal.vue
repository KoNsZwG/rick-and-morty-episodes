<!-- src/components/Items/EpisodeDetailModal.vue -->
<script setup lang="ts">
import axios from 'axios'
import type { IEpisode, IEpisodeCharacterResponse } from '@/interfaces'
import { ref, watch } from 'vue'

const props = defineProps<{
  episode: IEpisode | null
}>()

const emit = defineEmits(['close'])

const characters = ref<{ id: number; name: string }[]>([])
const isLoadingCharacters = ref(false)

const getWatchUrl = (episodeName: string) => {
  const query = `Watch Rick and Morty ${episodeName}`
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`
}

// NEW: This function will fetch character data from the list of URLs
const fetchCharacters = async (characterUrls: string[]) => {
  isLoadingCharacters.value = true
  characters.value = []
  try {
    const characterResponses = await Promise.all(
      characterUrls.map((url) => axios.get<IEpisodeCharacterResponse>(url))
    )
    // Now we store the full object we need
    characters.value = characterResponses.map((response) => ({
      id: response.data.id,
      name: response.data.name
    }))
  } catch (error) {
    // ... error handling
  } finally {
    isLoadingCharacters.value = false
  }
}

// NEW: Use a "watcher" to automatically run code when the 'episode' prop changes
watch(
  () => props.episode,
  (newEpisode: IEpisode | null) => {
    if (newEpisode) {
      // When the modal opens and we have an episode, fetch its characters
      fetchCharacters(newEpisode.characters)
    }
  }
)
</script>

<template>
  <!-- Modal backdrop -->
  <div
    v-if="episode"
    @click.self="emit('close')"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4"
  >
    <!-- Modal content -->
    <div
      class="bg-slate-800 rounded-lg w-11/12 max-w-2xl text-white shadow-xl max-h-full overflow-y-auto"
    >
      <!-- You can add a large image here if you want! -->
      <img :src="episode.characterImage" class="w-full h-48 object-cover rounded-t-lg" />

      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-3xl font-bold text-cyan-400">{{ episode.name }}</h2>
            <p class="text-slate-400">{{ episode.episode }} · Aired: {{ episode.air_date }}</p>
          </div>
          <button
            @click="emit('close')"
            class="text-slate-400 text-3xl leading-none hover:text-white"
          >
            &times;
          </button>
        </div>

        <!-- === UPDATED CHARACTER SECTION === -->
        <div class="mt-6 border-t border-slate-700 pt-4">
          <h3 class="font-bold text-slate-300 mb-3">Characters in this episode:</h3>
          <!-- Show loading message -->
          <p v-if="isLoadingCharacters" class="text-slate-400">Loading characters...</p>
          <!-- Show the list of characters in a nice grid -->
          <div v-else class="flex flex-wrap gap-2">
            <router-link
              v-for="char in characters"
              :key="char.id"
              :to="`/character/${char.id}`"
              @click="emit('close')"
              class="bg-slate-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full transition hover:bg-cyan-500 hover:text-white"
            >
              {{ char.name }}
            </router-link>
          </div>
        </div>
        <!-- ================================== -->

        <a
          :href="getWatchUrl(episode.name)"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 block w-full text-center bg-green-500 font-bold py-3 px-6 rounded-lg hover:bg-green-400 transition"
        >
          Watch Now
        </a>
      </div>
    </div>
  </div>
</template>
