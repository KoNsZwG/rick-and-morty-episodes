<!-- src/views/CharacterView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { IEpisodeCharacterResponse } from '@/interfaces'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: string // The ID from the URL, passed as a prop
}>()

const character = ref<IEpisodeCharacterResponse | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${props.id}`)
    character.value = response.data
  } catch (error) {
    console.error('Failed to fetch character details:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto p-6 text-white">
    <!-- Back Button for good UX -->
    <RouterLink to="/" class="text-cyan-400 hover:text-cyan-300 mb-6 inline-block"
      >&larr; Back to Episodes</RouterLink
    >

    <div v-if="isLoading" class="text-center">Loading character...</div>

    <div v-else-if="character" class="flex flex-col md:flex-row gap-8 bg-slate-800 p-8 rounded-lg">
      <img
        :src="character.image"
        :alt="character.name"
        class="w-full md:w-1/3 rounded-lg shadow-lg"
      />
      <div>
        <h1 class="text-5xl font-bold">{{ character.name }}</h1>
        <div class="mt-2 flex items-center gap-2 text-lg">
          <span
            :class="{
              'bg-green-500': character.status === 'Alive',
              'bg-red-500': character.status === 'Dead',
              'bg-slate-500': character.status === 'unknown'
            }"
            class="w-3 h-3 rounded-full"
          ></span>
          <span>{{ character.status }} - {{ character.species }}</span>
        </div>

        <div class="mt-6 text-slate-300">
          <p><span class="font-bold">Last known location:</span> {{ character.location.name }}</p>
          <p><span class="font-bold">First seen in:</span> {{ character.origin.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
