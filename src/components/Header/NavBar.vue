<template>
  <nav
    ref="navbar"
    class="bg-gray-700 text-gray-100 py-5 px-6 shadow md:flex justify-between items-center z-50"
    :class="{ 'sticky-nav': isSticky }"
  >
    <div class="flex flex-wrap">
      <div
        @click="setFilter('all')"
        class="flex items-center cursor-pointer"
        :class="{ hidden: open }"
      >
        <img :src="RickTitle" />
        <img :src="MortyIcon" />
        <h1 class="text-2xl">Rick and Morty Episodes</h1>
      </div>
      <div class="flex">
        <span
          @click="menuToggle()"
          class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl"
        >
          <i :class="[open ? 'fas fa-times' : 'fas fa-bars']"></i>
        </span>
      </div>
    </div>

    <ul
      class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-10 md:static absolute md:w-auto w-full duration-700 ease-in-out"
      :class="[open ? 'left-0 top-0 h-screen' : 'left-[-100%]']"
      @click="hidePanel"
    >
      <li class="md:mx-4 md:my-0 my-6 px-3 md:pb-0 pb-10">
        <button
          @click="handleFilters(EpisodeStatus.Watched)"
          class="text-xl uppercase font-semibold hover:text-gray-300"
        >
          Watched
        </button>
      </li>
      <li class="md:mx-4 md:my-0 my-6 px-3 md:pb-0 pb-10">
        <button
          @click="handleFilters(EpisodeStatus.Unwatched)"
          class="text-xl uppercase font-semibold hover:text-gray-300"
        >
          Unwatched
        </button>
      </li>
      <li class="md:mx-4 md:my-0 my-6 px-3 md:pb-0 pb-10">
        <button
          @click="handleFilters(EpisodeStatus.Watching)"
          class="text-xl uppercase font-semibold hover:text-gray-300"
        >
          Watching
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { EpisodeStatus } from '@/interfaces/index'
import { useEpisodeStore } from '@/stores/EpisodeStore/useEpisodeStore'
import RickTitle from '@/assets/images/RickTitle.svg'
import MortyIcon from '@/assets/images/MortyIcon.svg'

const open = ref(false)
const navbar = ref<HTMLElement | null>(null)
const isSticky = ref(false)

const { setFilter } = useEpisodeStore()
const { currentFilter } = storeToRefs(useEpisodeStore())

const menuToggle = () => {
  open.value = !open.value
}

const hidePanel = () => {
  open.value = false
}

const handleScroll = () => {
  if (navbar.value) {
    isSticky.value = window.scrollY > navbar.value.offsetTop
  }
}

const handleFilters = (status: EpisodeStatus) => {
  if (currentFilter.value === status) {
    setFilter('all')
  } else {
    setFilter(status)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="postcss" scoped>
.sticky-nav {
  @apply fixed top-0 w-full;
}
</style>
