<template>
  <button
    @click="updateToggleFavorite(props.episode)"
    class="absolute top-2 right-2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 focus:outline-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 sm:h-8 w-6 sm:w-8"
      :class="{
        'fill-current text-red-500': props.episode.isFavorite && props.episode.status === 'watched'
      }"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import type { IEpisode } from '@/interfaces'

const props = defineProps<{ episode: IEpisode }>()
const { updateToggleFavorite } = useEpisodeStore()
</script>
