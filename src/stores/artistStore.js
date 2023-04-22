import { defineStore } from 'pinia';
import SpotifyService from '@/services/SpotifyService';

export const useArtistStore = defineStore({
  id: 'artistStore',
  state: () => ({
    currentArtist: null,
  }),
  actions: {
    async fetchArtistById(id) {
      const artist = await SpotifyService.getArtist(id);
      this.currentArtist = artist;
    },
  },
});