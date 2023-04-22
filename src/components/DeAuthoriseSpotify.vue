<template>
    <div class="text-center pt-8">
      <button 
          @click="deauthorise" 
          class="bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-red-800"
          :class="{ 'opacity-50 bg-gray cursor-not-allowed': !isAuthorised }"
          >
        Deauthorise Spotify
      </button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/authStore';
  import spotifyService from '@/services/spotifyService';
  
  export default {
    setup() {
      // Get an instance of the authStore
      const authStore = useAuthStore();
  
      // Create a variable to store the value of the user authenticated state
      const isAuthorised = computed(() => authStore.isAuthorised);
  
      // The 'deauthorise' function is called when the button is clicked
      async function deauthorise() {
        // If the user is authenticated, proceed with deauthorisation
        if (isAuthorised) {
          // Get the client ID from the environment variables
          const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  
          // Call the deauthoriseSpotify function from the spotifyService
          const success = await spotifyService.deauthoriseSpotify(clientId, authStore.accessToken);
  
          // Clear the tokens in the authStore after revoking access
          if (success) {
            authStore.clearTokens();
          }
        }
      }
  
      // Expose the 'deauthorise' function for use in the template
      return {
        deauthorise,
        isAuthorised,
      };
    },
  };
  </script>