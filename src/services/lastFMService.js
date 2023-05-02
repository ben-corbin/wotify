import axios from 'axios';

const API_KEY = import.meta.env.production.VITE_LAST_FM_API_KEY;

async function fetchArtistBio(artistName) {
    console.log('api key:', API_KEY)
    try {
      const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist bio from Last.fm:', error);
      throw error;
    }
  }

async function fetchArtistTopTracks(artistName) {
    try {
        const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching artist top tracks from Last.fm:', error);
        throw error;
    }
}

async function fetchAlbumInfo(artistName, albumName) {
    try {
        const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching album info from Last.fm:', error);
        throw error;
    }
}

export default {
    fetchArtistBio, 
    fetchArtistTopTracks,
    fetchAlbumInfo
}