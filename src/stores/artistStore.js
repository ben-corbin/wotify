import { defineStore } from 'pinia';
import SpotifyService from '@/services/SpotifyService';
import lastFMService from '@/services/lastFMService';

export const useArtistStore = defineStore({
  id: 'artistStore',
  state: () => ({
    currentArtist: null,
    currentArtistAlbums: null,
    artistBio: null,
  }),
  actions: {
    async fetchArtistById(id) {
      const artist = await SpotifyService.getArtist(id);
      this.currentArtist = artist;
    },
    async fetchArtistAlbums(id) {
      const albums = await SpotifyService.getArtistAlbums(id);
      this.currentArtistAlbums = albums.items;
    },
    async fetchArtistBio(artistName) {
        const bio = await lastFMService.fetchArtistBio(artistName);
        if (bio) {
          this.artistBio = bio;
        } else {
          this.artistBio = null;
        }
      },
  },
});