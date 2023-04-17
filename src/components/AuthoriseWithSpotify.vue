<template>
    <div class="text-center">
      <button @click="authorize" class="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-green-800">
        Authorize with Spotify
      </button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/authStore';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      const isAuthenticated = computed(() => authStore.isAuthenticated);
  
      function authorize() {
        if (!isAuthenticated.value) {
          const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
          const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
          const scope = encodeURIComponent('user-read-private user-read-email');
          const responseType = 'code';
  
          const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  
          window.location.href = authUrl;
        }
      }
  
      return {
        authorize,
      };
    },
  };
  </script>