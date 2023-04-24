
<template>
  <div class="container mx-auto px-4 bg-gray-200 overflow-y-auto">
    <div class="grid grid-cols-3 gap-4 justify-items-start">
      <!-- Artists Column -->
      <div class="col-span-1">
        <h2
          class="text-2xl font-semibold mb-4 text-center text-black sticky top-0 bg-gray-200 z-10 py-6"
        >
          Artists
        </h2>
        <ul>
          <li v-for="artist in artists" :key="artist.id" class="mb-2">
            <div class="flex items-center space-x-2">
              <img
                :src="artist.images[0]?.url || defaultImage"
                alt="artist-image"
                class="w-12 h-12 rounded-full"
              />
              <router-link :to="`/artist/${artist.id}`" class="truncate w-50">{{ artist.name }}</router-link>
            </div>
          </li>
        </ul>
      </div>

      <!-- Tracks Column -->
      <div class="col-span-1">
        <h2
          class="text-2xl font-semibold mb-4 text-center text-black sticky top-0 bg-gray-200 z-10 py-6"
        >
          Tracks
        </h2>
        <ul>
          <li v-for="track in tracks" :key="track.id" class="mb-2">
            <div class="flex items-center space-x-2">
              <img
                :src="track.album.images[0]?.url || defaultImage"
                alt="track-image"
                class="w-12 h-12 rounded"
              />
              <div>
                <router-link :to="`/track/${track.id}`" class="truncate w-40">{{ track.name }}</router-link>
                <p class="text-gray-600 text-sm truncate w-40">
                  {{ track.artists.map((a) => a.name).join(', ') }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Albums Column -->
      <div class="col-span-1">
        <h2
          class="text-2xl font-semibold mb-4 text-center text-black sticky top-0 bg-gray-200 z-10 py-6"
        >
          Albums
        </h2>
        <ul>
          <li v-for="album in albums" :key="album.id" class="mb-2">
            <div class="flex items-center space-x-2">
              <img
                :src="album.images[0]?.url || defaultImage"
                alt="album-image"
                class="w-12 h-12 rounded"
              />
              <div>
                <router-link :to="`/album/${album.id}`" class="truncate w-50">{{ album.name }}</router-link>
                <p class="text-gray-600 text-sm truncate w-40">
                  {{ album.artists.map((a) => a.name).join(', ') }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useSearchStore } from '@/stores/searchStore'

export default defineComponent({
  setup() {
    const defaultImage = 'https://via.placeholder.com/64'
    const searchStore = useSearchStore()

    // Computed properties to access the search store
    const artists = computed(() => searchStore.artists)
    const tracks = computed(() => searchStore.tracks)
    const albums = computed(() => searchStore.albums)

    return {
      defaultImage,
      artists,
      tracks,
      albums
    }
  }
})
</script>