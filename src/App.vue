<template>
  <div class="flex flex-col justify-between h-[100vh]">
    <header>
      <div class="container mx-auto py-20 flex flex-col items-center">
        <h1 class="text-8xl pb-12 text-white font-sans">Wotify</h1>

        <nav>
          <RouterLink to="/" class="text-white">Home</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer>
      <div class="container mx-auto py-20 flex flex-col items-center text-white">
        <p>Wotify &copy; 2021</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>