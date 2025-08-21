<script setup lang="ts">
import NavBar from '@/components/Header/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-slate-900 min-h-screen">
    <NavBar />
    <RouterView />
  </div>
</template>
