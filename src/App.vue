<template>
  <div class="flex flex-col justify-between h-[100vh]">
    <header>
      <div class="container mx-auto py-20 flex flex-row justify-between items-center">
        <h1 class="text-6xl text-white">Wotify</h1>

        <nav class="flex gap-6">
          <RouterLink to="/" class="text-white text-xl">Home</RouterLink>
          <RouterLink to="/top10" class="text-white text-xl">Top 10</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer>
      <div class="container mx-auto py-20 flex flex-col items-center text-white">
        <p>Wotify &copy; 2023</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
