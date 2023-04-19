import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { refreshToken, isAccessTokenExpired } from '@/auth';

const API_BASE_URL = 'https://api.spotify.com/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

async function getAccessToken() {
  const authStore = useAuthStore();

  if (isAccessTokenExpired(authStore.accessTokenExpiration)) {
    const newAccessToken = await refreshToken(authStore.refreshToken);

    if (newAccessToken) {
      const expiresIn = 3600; // TODO - Get this from the response
      authStore.setTokens(newAccessToken, authStore.refreshToken, expiresIn);
    } else {
      // TODO - Handle error in refreshing the access token
      authStore.clearTokens();
    }
  }

  return authStore.accessToken;
}

async function search(query, token, type, offset, limit) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: query,
          type: type,
          offset: offset,
          limit: limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response data:', response.data);
  
      return {
        artists: response.data.artists.items || [],
        tracks: response.data.tracks.items || [],
        albums: response.data.albums.items || [],
      };
    } catch (error) {
      console.error('Error searching Spotify API:', error);
      throw new Error('Error searching Spotify API');
    }
  }

export default {
  search,
  getAccessToken,
};