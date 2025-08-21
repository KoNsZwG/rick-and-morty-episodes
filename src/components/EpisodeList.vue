<!-- src/components/Items/EpisodeList.vue (Updated with Phase 3) -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import EpisodeDetailModal from './Items/EpisodeItemOverlay/EpisodeDetailModal.vue'
import EpisodeCard from './Items/EpisodeCard.vue'
import type { IEpisode } from '@/interfaces'
const store = useEpisodeStore()

// NEW: State to manage the modal
const selectedEpisode = ref<IEpisode | null>(null)

const openModal = (episode: IEpisode) => {
  selectedEpisode.value = episode
}

const closeModal = () => {
  selectedEpisode.value = null
}

onMounted(() => {
  console.log('EpisodeList component has mounted!') // <-- ADD THIS LINE
  if (store.episodes.length === 0) {
    console.log('Episode list is empty, attempting to fetch...') // <-- ADD THIS LINE
    store.fetchInitialEpisodes()
  }
})
</script>

<template>
  <!-- 1. Main container with modern spacing -->
  <main class="container mx-auto p-4 sm:p-6">
    <!-- 2. Improved Loading State (only shows on the very first load) -->
    <div
      v-if="store.isLoading && store.episodes.length === 0"
      class="flex flex-col items-center justify-center text-center py-20 text-slate-400"
    >
      <!-- You can add a cool SVG spinner here -->
      <svg
        class="animate-spin h-10 w-10 text-cyan-400 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p class="text-2xl">Getting schwifty...</p>
    </div>

    <!-- 3. Improved Empty State (shows when filters find nothing) -->
    <div v-else-if="store.filteredEpisodes.length === 0" class="text-center py-20 text-slate-400">
      <p class="text-4xl font-bold">Wubba Lubba Dub Dub!</p>
      <p class="mt-2 text-lg">Looks like no episodes match your filter.</p>
    </div>

    <!-- 4. The Responsive Grid for all the episode cards -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <EpisodeCard
        v-for="episode in store.filteredEpisodes"
        :key="episode.id"
        :episode="episode"
        @open-detail="openModal"
      />
    </div>

    <!-- 5. "Load More" Button and loading indicator for pagination -->
    <div class="flex justify-center mt-10">
      <button
        v-if="store.nextPageUrl && !store.isLoadingMore"
        @click="store.fetchNextPage()"
        class="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
      >
        Load More Episodes
      </button>
      <div v-if="store.isLoadingMore" class="text-slate-400 text-lg">Loading more...</div>
    </div>

    <EpisodeDetailModal :episode="selectedEpisode" @close="closeModal" />
  </main>
</template>
