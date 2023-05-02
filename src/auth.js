import axios from 'axios'

// Define the necessary OAuth credentials and redirect URI
const clientId = import.meta.env.production.VITE_SPOTIFY_CLIENT_ID
const redirectUri = import.meta.env.production.VITE_REDIRECT_URI

// Function to generate a random code verifier
export function generateCodeVerifier() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  const length = 128
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

// Function to derive a code challenge from a code verifier
async function deriveCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

// Function to build the authorization URL and redirect the user
export async function authorizeSpotify() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await deriveCodeChallenge(codeVerifier)

  const scope = 'user-read-private user-read-email' // Add your required scopes here
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&code_challenge=${codeChallenge}&code_challenge_method=S256`

  // Store the codeVerifier in localStorage 
  console.log('Code verifier:', codeVerifier)
  localStorage.setItem('pkce_code_verifier', codeVerifier)

  // Redirect the user to the authorization URL
  window.location.href = authUrl
}

// Function to request an access token from Spotify using an authorization code
export async function requestAccessToken(code, codeVerifier) {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'authorization_code');
    requestBody.append('code', code);
    requestBody.append('redirect_uri', redirectUri);
    requestBody.append('code_verifier', codeVerifier);
    requestBody.append('client_id', clientId);

    const response = await axios.post('https://accounts.spotify.com/api/token', requestBody);

    // Return the access token, refresh token, and expiration time
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    }
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}


// Function to refresh an access token using a refresh token
export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:`)}`
      }
    })

    // Return the new access token
    return response.data.access_token
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return null
  }
}

// Function to check if an access token is expired or not
export function isAccessTokenExpired(accessTokenExpiration) {
  if (!accessTokenExpiration) {
    return true
  }
  return Date.now() >= accessTokenExpiration
}
