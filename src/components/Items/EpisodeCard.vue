<!-- src/components/Items/EpisodeCard.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import type { IEpisode } from '@/interfaces'
import { EpisodeStatus } from '@/interfaces'

const props = defineProps<{
  episode: IEpisode
}>()

const store = useEpisodeStore()

const isMenuOpen = ref(false)

// Status styles for dynamic class binding
const statusStyles: Record<EpisodeStatus, string> = {
  [EpisodeStatus.Watched]: 'bg-green-600 text-white',
  [EpisodeStatus.Watching]: 'bg-yellow-500 text-black',
  [EpisodeStatus.Unwatched]: 'bg-slate-600 text-white'
}

// Helper for dynamic class binding based on status
const handleStatusUpdate = (newStatus: EpisodeStatus) => {
  store.updateEpisodeStatus(props.episode.id, newStatus)
  isMenuOpen.value = false // Close the menu
}

defineEmits(['openDetail'])
</script>

<template>
  <!-- Use 'group' to control child visibility on hover -->
  <div
    class="group relative bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/20"
  >
    <!-- NEW: Clickable overlay to open the modal.
         We'll emit an event to the parent component. -->
    <div @click="$emit('openDetail', episode)" class="absolute inset-0 z-10 cursor-pointer">
      <!-- Play Icon that appears on hover -->
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
    <!-- Favorite Button -->
    <button
      @click="store.updateToggleFavorite(episode.id)"
      class="absolute top-3 right-3 z-20 p-2 bg-slate-900/50 rounded-full text-white backdrop-blur-sm transition hover:text-red-500 active:scale-90"
    >
      <svg
        class="w-6 h-6 transition-colors"
        :class="{ 'fill-red-500 text-red-500': episode.isFavorite }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 016.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
        ></path>
      </svg>
    </button>

    <!-- Image with a subtle gradient overlay for text legibility -->
    <div class="relative">
      <img :src="episode.characterImage" :alt="episode.name" class="w-full h-44 object-cover" />
      <div
        class="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-slate-800 to-transparent"
      ></div>
    </div>

    <!-- Episode Details -->
    <div class="p-4 relative">
      <h3 class="font-bold text-lg text-white truncate">{{ episode.name }}</h3>
      <p class="text-sm text-slate-400">{{ episode.episode }} · {{ episode.air_date }}</p>

      <!-- NEW: Interactive Status Pill & Dropdown Menu -->
      <div class="absolute -top-5 right-3">
        <div class="relative">
          <!-- The Status Pill Button -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            :class="statusStyles[episode.status]"
            class="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm transition hover:brightness-125"
          >
            {{ episode.status.toUpperCase() }}
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isMenuOpen }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <!-- The Dropdown Menu (only shows when isMenuOpen is true) -->
          <div
            v-if="isMenuOpen"
            @mouseleave="isMenuOpen = false"
            class="absolute right-0 mt-2 w-32 bg-slate-700 rounded-md shadow-lg z-10"
          >
            <a
              @click="handleStatusUpdate(EpisodeStatus.Watched)"
              href="#"
              class="block px-4 py-2 text-sm text-slate-200 hover:bg-green-500"
              >Watched</a
            >
            <a
              @click="handleStatusUpdate(EpisodeStatus.Watching)"
              href="#"
              class="block px-4 py-2 text-sm text-slate-200 hover:bg-yellow-500"
              >Watching</a
            >
            <a
              @click="handleStatusUpdate(EpisodeStatus.Unwatched)"
              href="#"
              class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
              >Unwatched</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
