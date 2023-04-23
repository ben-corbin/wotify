import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { refreshToken, isAccessTokenExpired } from '@/auth'

const API_BASE_URL = 'https://api.spotify.com/v1'

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

apiClient.interceptors.request.use(
	async (config) => {
		const accessToken = await getAccessToken()
		config.headers.Authorization = `Bearer ${accessToken}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

async function getAccessToken() {
	const authStore = useAuthStore()

	if (isAccessTokenExpired(authStore.accessTokenExpiration)) {
		const newAccessToken = await refreshToken(authStore.refreshToken)

		if (newAccessToken) {
			const expiresIn = 3600
			authStore.setTokens(newAccessToken, authStore.refreshToken, expiresIn)
		} else {
			authStore.clearTokens()
		}
	}

	return authStore.accessToken
}

async function search(query, token, type, offset, limit) {
	try {
		const response = await apiClient.get('/search', {
			params: {
				q: query,
				type: type,
				offset: offset,
				limit: limit
			}
		})

		console.log('Response data:', response)

		return {
			artists: response.data.artists.items || [],
			tracks: response.data.tracks.items || [],
			albums: response.data.albums.items || []
		}
	} catch (error) {
		console.error('Error searching Spotify API:', error)
		throw new Error('Error searching Spotify API')
	}
}

async function getArtist(id) {
	try {
	  const response = await apiClient.get(`/artists/${id}`)
	  return response.data
	} catch (error) {
	  console.error('Error fetching artist:', error)
	  return null
	}
}

async function getArtistAlbums(id) {
	try {
		const response = await apiClient.get(`/artists/${id}/albums`)
		return response.data
	} catch (error) {
		console.error('Error fetching album:', error)
		return null
	}
}
		

async function deauthoriseSpotify(clientId, accessToken) {
	try {
		await axios.post(`http://localhost:4000/revoke-token?access_token=${accessToken}`);
		return true;
	} catch (error) {
		console.error('Error revoking access:', error);
		return false;
	}
}

export default {
	search,
	getAccessToken,
	deauthoriseSpotify,
	getArtist,
	getArtistAlbums,
}