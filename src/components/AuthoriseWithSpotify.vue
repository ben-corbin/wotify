<template>
  <div class="text-center pt-8">
    <button
      @click="authorise"
      class="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-green-800"
      :class="{ 'opacity-50 bg-gray cursor-not-allowed': isAuthorised }"
    >
      Authorize with Spotify
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { authorizeSpotify } from '@/auth'

export default {
  setup() {
    // Get an instance of the authStore
    const authStore = useAuthStore()

    // Create a variable to store value of user authenticated state
    const isAuthorised = computed(() => authStore.isAuthorised)

    console.log('isAuthorised', isAuthorised.value)

    // The 'authorise' function is called when the button is clicked
    function authorise() {
      // If the user is not authenticated, proceed with authorization
       if (!isAuthorised.value) {
        authorizeSpotify()
      }
    }

    // Expose the 'authorise' function for use in the template
    return {
      authorise,
      isAuthorised
    }
  }
}
</script>
