<template>
  <div>
    <WatchNow />
    <ToggleFavoriteButton :episode="episode" />
  </div>
</template>

<script setup lang="ts">
import WatchNow from './svgs/WatchNow.vue'
import ToggleFavoriteButton from './ToggleFavoriteButton.vue'
import type { IEpisode } from '@/interfaces'

defineProps<{
  episode: IEpisode
}>()
</script>
