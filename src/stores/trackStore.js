import { defineStore } from 'pinia';
import spotifyService from '../services/spotifyService';

export const useTrackStore = defineStore({
    id: 'trackStore',
  state: () => ({
    topTracks: [],
  }),

  actions: {
    async fetchTopTracks(id) {
      try {
        const response = await spotifyService.getTopTracks(id);
        this.topTracks = response
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    },
  },
});