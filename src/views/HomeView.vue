<template>
  <main class="container flex flex-row mx-auto justify-center w-1/2 pb-8">
    <SearchBar />
  </main>
  <SearchResults />
  <AuthoriseWithSpotify />
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
import AuthoriseWithSpotify from '../components/AuthoriseWithSpotify.vue';
import SearchResults from '../components/SearchResults.vue';

</script>
