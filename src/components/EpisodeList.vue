<template>
  <div>
    <NavBar />
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="episodes.length === 0">No episodes found</div>
    <div
      v-else
      class="grid xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-10 p-10"
    >
      <EpisodeItem
        v-for="episode in filteredEpisodes"
        class="hover:shadow-lg transition-all duration-300 ease-in-out"
        :key="episode.id"
        :episode="episode"
        :image="episode.characterImage"
      />
    </div>
    <div v-if="isLoadingMore">Loading more episodes...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import EpisodeItem from './Items/EpisodeItem.vue'
import NavBar from './Header/NavBar.vue'

const { fetchNextPage, fetchEpisodes } = useEpisodeStore()
const { episodes, isLoading, filteredEpisodes, nextPageUrl } = storeToRefs(useEpisodeStore())
const isLoadingMore = ref(false)
const lastScrollPosition = ref(0)

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100
  if (bottomOfWindow && !isLoadingMore.value && nextPageUrl.value) {
    isLoadingMore.value = true
    lastScrollPosition.value = window.scrollY

    fetchNextPage().finally(() => {
      isLoadingMore.value = false
      window.scrollTo(0, lastScrollPosition.value)
    })
  }
}

onMounted(async () => {
  await fetchEpisodes()

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
