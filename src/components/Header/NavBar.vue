<!-- src/components/Header/NavBar.vue -->
<script setup lang="ts">
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import { EpisodeStatus } from '@/interfaces'

const store = useEpisodeStore()
</script>

<template>
  <!-- Sticky header with padding and a bottom border -->
  <header class="sticky top-0 z-30 bg-slate-900/70 backdrop-blur-lg border-b border-slate-700">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Title Section -->
      <div class="flex items-center gap-4">
        <!-- You can use your SVG icons here -->
        <img src="@/assets/images/MortyIcon.svg" alt="Morty" class="w-10 h-10" />
        <img src="@/assets/images/RickTitle.svg" alt="Rick and Morty" class="h-8 hidden sm:block" />
        <h1 class="text-white text-xl font-bold sm:hidden">R&M Episodes</h1>
      </div>

      <!-- NEW: Filter Pill Group -->
      <nav class="flex items-center space-x-2 bg-slate-800 p-1 rounded-full">
        <button
          @click="store.setFilter('all')"
          :class="
            store.currentFilter === 'all'
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:bg-slate-700'
          "
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
        >
          All
        </button>
        <button
          @click="store.setFilter(EpisodeStatus.Watched)"
          :class="
            store.currentFilter === EpisodeStatus.Watched
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:bg-slate-700'
          "
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
        >
          Watched
        </button>
        <button
          @click="store.setFilter(EpisodeStatus.Unwatched)"
          :class="
            store.currentFilter === EpisodeStatus.Unwatched
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:bg-slate-700'
          "
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
        >
          Unwatched
        </button>
        <button
          @click="store.setFilter(EpisodeStatus.Watching)"
          :class="
            store.currentFilter === EpisodeStatus.Watching
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:bg-slate-700'
          "
          class="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
        >
          Watching
        </button>
      </nav>
    </div>
  </header>
</template>
