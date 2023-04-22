<template>
  <main class="container flex flex-row mx-auto justify-center w-1/2 pb-8">
    <SearchBar />
  </main>
  <transition name="search-results">
    <SearchResults v-if="searchResultsPresent" />
  </transition>
  <AuthoriseWithSpotify />
  <DeAuthoriseSpotify />
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import AuthoriseWithSpotify from '../components/AuthoriseWithSpotify.vue'
import DeAuthoriseSpotify from '../components/DeAuthoriseSpotify.vue'
import SearchResults from '../components/SearchResults.vue'
import { useSearchStore } from '../stores/searchStore'
// import useAuth from '../composables/useAuth';
import { computed } from 'vue'


const searchStore = useSearchStore()

const searchResultsPresent = computed(() => {
  if (searchStore.artists.length || searchStore.tracks.length || searchStore.albums.length) {
    return true
  }
})
</script>

<style>
.search-results-enter-active,
.search-results-leave-active {
  transition: all 0.3s ease;
}

/* Initial state for entering the DOM */
.search-results-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Final state for leaving the DOM */
.search-results-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
