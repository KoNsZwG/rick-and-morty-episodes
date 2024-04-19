<template>
  <div>
    <div class="rounded-xl overflow-hidden border border-gray-300 shadow-custom">
      <div class="relative">
        <div v-if="image">
          <img :src="image" class="w-full h-auto" />
          <EpisodeItemOverlay :episode="episode" />
        </div>
        <div v-else>
          <img src="@/assets/images/item.jpg" alt="Fallback Image" class="w-full h-auto" />
          <EpisodeItemOverlay :episode="episode" />
        </div>
      </div>

      <div
        class="flex xxxs:flex-wrap xxs:flex-wrap xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap p-4 bg-rgb(63, 114, 175)"
      >
        <div
          class="flex w-full xxxs:text-xs text-sm xs:text-sm sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-helvetica font-bold text-gray-200"
        >
          {{ episode.name }}
        </div>

        <div
          class="flex w-full xxxs:text-xs text-sm xs:text-sm sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-helvetica text-gray-200"
        >
          {{ episode.episode }}
        </div>
        <div
          class="flex w-full xxxs:text-xs text-sm xs:text-sm sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-helvetica text-gray-200"
        >
          {{ episode.air_date }}
        </div>
      </div>
      <div
        class="flex xxxs:flex-wrap xxs:flex-wrap xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap bg-gray-700"
      >
        <div class="flex w-full">
          <button
            @click="updateEpisodeStatus(episode, EpisodeStatus.Watched)"
            :class="{
              'flex-1': true,
              'transition duration-300 hover:scale-105 hover:shadow-md': true,
              'bg-gradient-to-r from-green-500 via-green-600 to-green-700 animate-watching text-white ':
                EpisodeStatus.Watched === episode.status
            }"
            class="py-4 font-semibold uppercase xxxs:text-xs xxs:text-xs text-wrap text-sm xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-lg font-helvetica"
          >
            <span class="relative text-white font-bold">Watched</span>
          </button>
        </div>
        <div class="flex w-full">
          <button
            @click="updateEpisodeStatus(episode, EpisodeStatus.Unwatched)"
            :class="{
              'flex-1': true,
              'transition duration-300 hover:scale-105 hover:shadow-md': true,
              'bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-watching text-white':
                EpisodeStatus.Unwatched === episode.status
            }"
            class="py-4 font-semibold uppercase xxxs:text-xs xxs:text-xs text-wrap text-sm xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-lg font-helvetica"
          >
            <span class="relative text-white font-bold">Unwatched</span>
          </button>
        </div>
        <div class="flex w-full">
          <button
            @click="updateEpisodeStatus(episode, EpisodeStatus.Watching)"
            :class="{
              'flex-1': true,
              'transition duration-300 hover:scale-105 hover:shadow-md': true,
              'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 animate-watching text-white':
                EpisodeStatus.Watching === episode.status
            }"
            class="py-4 font-semibold uppercase xxxs:text-xs xxs:text-xs text-wrap text-sm xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-lg font-helvetica"
          >
            <span class="relative text-white font-bold">Watching</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EpisodeItemOverlay from './EpisodeItemOverlay/EpisodeItemOverlay.vue'
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import { EpisodeStatus } from '@/interfaces'
import type { IEpisode } from '@/interfaces'

const { updateEpisodeStatus } = useEpisodeStore()

defineProps<{
  episode: IEpisode
  image: string | undefined
}>()
</script>
