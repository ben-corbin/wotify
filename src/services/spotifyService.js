import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { refreshToken, isAccessTokenExpired } from '@/auth'

const API_BASE_URL = 'https://api.spotify.com/v1'

// Create an axios instance with the base URL and default headers
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Add an interceptor to the axios instance to automatically set the Authorization header
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

	// Check if the access token is expired, and refresh it if necessary
	if (isAccessTokenExpired(authStore.accessTokenExpiration)) {
		const newAccessToken = await refreshToken(authStore.refreshToken)

		if (newAccessToken) {
			const expiresIn = 3600 // TODO - Get the expiration time from the response object
			authStore.setTokens(newAccessToken, authStore.refreshToken, expiresIn)
		} else {
			// TODO - Handle error in refreshing the access token
			authStore.clearTokens()
		}
	}

	return authStore.accessToken
}

// Function to search the Spotify API using the given query and parameters
async function search(query, token, type, offset, limit) {
	try {
		const response = await axios.get('https://api.spotify.com/v1/search', {
			params: {
				q: query,
				type: type,
				offset: offset,
				limit: limit
			},
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		console.log('Response data:', response)

		// Return the search results as an object containing arrays of artists, tracks, and albums
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

// Function to revoke the access token
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
	deauthoriseSpotify
}
