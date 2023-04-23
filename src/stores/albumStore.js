import { defineStore } from 'pinia';
import lastFMService from '@/services/lastFMService';

export const useAlbumStore = defineStore({
  id: 'albumStore',                      
  state: () => ({
    tracks: [],
  }),

  actions: {
    async fetchTracks(artist, album) {
      try {
        const response = await lastFMService.fetchAlbumInfo(artist, album);
        if (response && response.album && response.album.tracks) {
          this.tracks = response.album.tracks.track;
        } else {
          this.tracks = [];
        }
      } catch (error) {
        console.error('Error fetching album info:', error);
        this.tracks = [];
      }
    },
  },
});