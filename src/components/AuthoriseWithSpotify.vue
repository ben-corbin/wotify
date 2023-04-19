<template>
  <div class="text-center pt-8">
    <!-- Create an authorize button that triggers the 'authorize' method on click -->
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
    // Get an instance of the authStore
    const authStore = useAuthStore();

    // Create a computed property to check if the user is authenticated
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    // The 'authorize' function is called when the button is clicked
    function authorize() {
      // If the user is not authenticated, proceed with authorization
      if (!isAuthenticated.value) {
        // Set the necessary OAuth parameters
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        const scope = encodeURIComponent('user-read-private user-read-email');
        const responseType = 'code';

        // Build the authorization URL
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

        // Redirect the user to the Spotify authorization page
        window.location.href = authUrl;
      }
    }

    // Expose the 'authorize' function for use in the template
    return {
      authorize,
    };
  },
};
</script>