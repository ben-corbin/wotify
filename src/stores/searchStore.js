import { defineStore } from 'pinia';
import searchService from '@/services/searchService';

export const useSearchStore = defineStore({
  id: 'search',

  state: () => ({
    artists: [],
    tracks: [],
    albums: [],
    offsetArtists: 20,
    offsetTracks: 20,
    offsetAlbums: 20,
    searchQuery: '',
  }),

  actions: {
    setResults(results) {
      this.results = results;
    },

    appendResults(results) {
      this.results.push(...results);
    },
    async loadMoreArtists() {
        try {
          const artists = await searchService.searchArtists(
            this.searchQuery,
            this.offsetArtists,
            20
          );
          this.artists.push(...artists);
          this.offsetArtists += 20;
        } catch (error) {
          console.error('Error loading more artists:', error);
        }
      },
    
      async loadMoreTracks() {
        try {
          const tracks = await searchService.searchTracks(
            this.searchQuery,
            this.offsetTracks,
            20
          );
          this.tracks.push(...tracks);
          this.offsetTracks += 20;
        } catch (error) {
          console.error('Error loading more tracks:', error);
        }
      },
      
      async loadMoreAlbums() {
        try {
          const albums = await searchService.searchAlbums(
            this.searchQuery,
            this.offsetAlbums,
            20
          );
          this.albums.push(...albums);
          this.offsetAlbums += 20;
        } catch (error) {
          console.error('Error loading more albums:', error);
        }
      },
  }
});