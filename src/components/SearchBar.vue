<template>
    <div class="search">
      <div class="search-input">
        <input
          type="text"
          v-model="query"
          @input="debounceSearch"
          placeholder="Search for artists, tracks, albums..."
          class="w-[500px] p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>
      <div v-if="searchResults" class="search-results mt-4">
        <!-- Render search results here temporarily-->
        <div v-for="result in searchResults" :key="result.id">
          <h2>{{ result.name }}</h2>
          <p>{{ result.type }}</p>
      </div>
     </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import searchService from '@/services/searchService';
  
  export default {
    setup() {
      const query = ref('');
      const searchResults = ref(null);
      let searchTimeout = null;
  
      function debounceSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          search();
        }, 500);
      }
  
      async function search() {
        if (query.value.trim()) {
          try {
            const results = await searchService.search(query.value);
            searchResults.value = results;
          } catch (error) {
            console.error('Error searching:', error);
          }
        } else {
          searchResults.value = null;
        }
      }
  
      return {
        query,
        searchResults,
        debounceSearch,
        search,
      };
    },
  };
  </script>
  
  