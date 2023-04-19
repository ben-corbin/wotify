import axios from 'axios';

// Define the necessary OAuth credentials and redirect URI
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

// Function to request an access token from Spotify using an authorization code
export async function requestAccessToken(code) {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Encode client credentials in base64
      },
    });

    // Return the access token, refresh token, and expiration time
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

// Function to refresh an access token using a refresh token
export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Encode client credentials in base64
      },
    });

    // Return the new access token
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

// Function to check if an access token is expired or not
export function isAccessTokenExpired(accessTokenExpiration) {
  if (!accessTokenExpiration) {
    return true;
  }
  return Date.now() >= accessTokenExpiration;
}


