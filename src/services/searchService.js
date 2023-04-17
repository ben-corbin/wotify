import spotifyService from './spotifyService';

async function search(query) {

  const accessToken = await spotifyService.getAccessToken();

  spotifyService.updateAccessToken(accessToken);

  const results = await spotifyService.search(query);
  return results;
}

export default {
  search,
};