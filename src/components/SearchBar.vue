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
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import searchService from '@/services/searchService';
  import { useSearchStore } from '@/stores/searchStore';
  
  export default {
    setup() {
      const query = ref('');
      let searchTimeout = null;
      const searchStore = useSearchStore();
  
      function debounceSearch() {
        clearTimeout(searchTimeout);
        // when the debounce function is called, it will wait 500ms before calling the search function
        // via the setTimeout function which calls the annoymous function that calls the search function
        searchTimeout = setTimeout(() => {
          search();
        }, 500);
      }
  
      async function search() {
        if (query.value.trim()) {
            try {
            searchStore.searchQuery = query.value; // Set the search query in the store

            // Reset the offsets in the store
            // searchStore.offsetArtists = 0;
            // searchStore.offsetTracks = 0;
            // searchStore.offsetAlbums = 0;

            const results = await searchService.searchInitial(query.value);

            // Store the initial search results in the store
            searchStore.artists = results.artists;
            searchStore.tracks = results.tracks;
            searchStore.albums = results.albums;
            } catch (error) {
            console.error('Error searching:', error);
        }
  }
}
  
      return {
        query,
        debounceSearch,
        search,
      };
    },
  };
  </script>
  
  