<template>
    <div class="container mx-auto px-4 bg-white overflow-y-auto">
      <div class="grid grid-cols-3 gap-4 justify-items-center">
        <!-- Artists Column -->
        <div class="col-span-1">
          <h2 class="text-xl font-semibold mb-4 text-center text-black">Artists</h2>
          <ul>
            <li v-for="artist in artists" :key="artist.id" class="mb-2">
              <div class="flex items-center space-x-2">
                <img :src="artist.images[0]?.url || defaultImage" alt="artist-image" class="w-12 h-12 rounded-full">
                <p>{{ artist.name }}</p>
              </div>
            </li>
          </ul>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="loadMoreArtists">Load More</button>
        </div>
  
        <!-- Tracks Column -->
        <div class="col-span-1">
          <h2 class="text-xl font-semibold mb-4 text-center text-white">Tracks</h2>
          <ul>
            <li v-for="track in tracks" :key="track.id" class="mb-2">
              <div class="flex items-center space-x-2">
                <img :src="track.album.images[0]?.url || defaultImage" alt="track-image" class="w-12 h-12 rounded">
                <div>
                  <p>{{ track.name }}</p>
                  <p class="text-gray-600 text-sm">{{ track.artists.map(a => a.name).join(', ') }}</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="loadMoreTracks">Load More</button>
        </div>
  
        <!-- Albums Column -->
        <div class="col-span-1">
          <h2 class="text-xl font-semibold mb-4 text-center text-white">Albums</h2>
          <ul>
            <li v-for="album in albums" :key="album.id" class="mb-2">
              <div class="flex items-center space-x-2">
                <img :src="album.images[0]?.url || defaultImage" alt="album-image" class="w-12 h-12 rounded">
                <div>
                  <p>{{ album.name }}</p>
                  <p class="text-gray-600 text-sm">{{ album.artists.map(a => a.name).join(', ') }}</p>
                </div>
              </div>
            </li>
          </ul>
          <!-- TODO - Make this button a component and import -->
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="loadMoreAlbums">Load More</button>
        </div>
      </div>
    </div>
  </template>

<script>
import { defineComponent, computed } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

export default defineComponent({
  setup() {
    const defaultImage = 'https://via.placeholder.com/64';
    const searchStore = useSearchStore();

    const loadMoreArtists = async () => {
      await searchStore.loadMoreArtists();
    };

    const loadMoreTracks = async () => {
      await searchStore.loadMoreTracks();
    };

    const loadMoreAlbums = async () => {
      await searchStore.loadMoreAlbums();
    };

    const artists = computed(() => searchStore.artists);
    const tracks = computed(() => searchStore.tracks);
    const albums = computed(() => searchStore.albums);

    return {
      defaultImage,
      loadMoreArtists,
      loadMoreTracks,
      loadMoreAlbums,
      artists,
      tracks,
      albums,
    };
  },
});
</script>