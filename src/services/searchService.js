import spotifyService from './spotifyService'

async function searchInitial(query) {
  const accessToken = await spotifyService.getAccessToken()

  const results = await spotifyService.search(query, accessToken, 'artist,track,album', 0, 20)
  return results
}

async function searchArtists(query, offset, limit) {
  const accessToken = await spotifyService.getAccessToken()
  const response = await spotifyService.search(query, accessToken, 'artist', offset, limit)
  return response.artists
}

async function searchTracks(query, offset, limit) {
  const accessToken = await spotifyService.getAccessToken()
  const response = await spotifyService.search(query, accessToken, 'track', offset, limit)
  return response.tracks
}

async function searchAlbums(query, offset, limit) {
  const accessToken = await spotifyService.getAccessToken()
  const response = await spotifyService.search(query, accessToken, 'album', offset, limit)
  return response.albums
}

export default {
  searchInitial,
  searchArtists,
  searchTracks,
  searchAlbums
}
