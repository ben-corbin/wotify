<template>
  <div class="bg-custom-image flex flex-col justify-between h-[100vh]">
    <header>
      <div class="container mx-auto py-20 flex flex-row justify-between items-center">
        <h1 class="text-6xl text-white">Wotify</h1>

        <nav class="flex gap-6">
          <RouterLink to="/" class="text-white text-xl">Home</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer>
      <div v-if="isHomeView" class="gradient-overlay w-full h-12 absolute bottom-24"></div>
      <div class="w-full h-24 p-8 flex flex-col items-center text-white bg-[#111827]">
        <p>Wotify &copy; 2023</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute();

    return {
      isHomeView: computed(() => route.name === 'Home')
    };
  }
};

</script>

<style>
.gradient-overlay {
  background-image: linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0));
}
</style>
