<template>
    <div v-if="artistData" class="bg-gray-900 text-white min-h-screen">
      <div class="container mx-auto py-12">
        <div class="flex flex-wrap items-center">
          <div class="w-full md:w-1/2">
            <img
              :src="artistData.images[0].url"
              :alt="artistData.name"
              class="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div class="w-full md:w-1/2 px-6 md:px-12">
            <h1 class="text-4xl font-bold mb-4">{{ artistData.name }}</h1>
            <div class="text-xl mb-4">
              <span class="font-semibold">Genres:</span>
              <span>{{ artistData.genres.join(', ') }}</span>
            </div>
            <div class="text-xl mb-4">
              <span class="font-semibold">Popularity:</span>
              <span>{{ artistData.popularity }}</span>
            </div>
            <div class="text-xl mb-4">
              <span class="font-semibold">Followers:</span>
              <span>{{ artistData.followers.total }}</span>
            </div>
            <div class="text-xl">
              <span class="font-semibold">Spotify Page:</span>
              <a
                :href="artistData.external_urls.spotify"
                class="text-blue-500 hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onBeforeMount } from 'vue'
  import { useArtistStore } from '@/stores/artistStore'
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute()
      const artistStore = useArtistStore()
      const artistData = computed(() => artistStore.currentArtist)
  
      const fetchArtistById = async (id) => {
        await artistStore.fetchArtistById(id)
      }
  
      onBeforeMount(async () => {
        await fetchArtistById(route.params.id)
      })
  
      return {
        artistData,
      }
    },
  }
  </script>