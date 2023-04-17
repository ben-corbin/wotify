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

async function search(query, type = 'artist,track,album') {
  try {
    const response = await apiClient.get('/search', {
      params: {
        q: query,
        type,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching Spotify API:', error);
    throw error;
  }
}

export default {
  search,
};