// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
// IMPORT THE CORRECT PAGE COMPONENTS
import EpisodeList from '../components/EpisodeList.vue'
import CharacterView from '../views/CharacterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // The component for the homepage is EpisodeList.vue (CORRECT)
      component: EpisodeList
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterView,
      props: true
    }
  ]
})

export default router
