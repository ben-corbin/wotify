import { defineStore } from 'pinia';
import spotifyService from '@/services/spotifyService';
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
      const artist = await spotifyService.getArtist(id);
      this.currentArtist = artist;
    },
    async fetchArtistAlbums(id) {
      const albums = await spotifyService.getArtistAlbums(id);
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