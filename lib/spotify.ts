import qs from 'query-string';
import fetch from './fetch';
import { SpotifyCurrentlyPlaying, SpotifyTopTracks } from '~/modules/spotify/types';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface GetAccessTokenResponse {
  access_token: string;
}

export type TopTracksRange = 'short_term' | 'medium_term' | 'long_term';

async function getAccessToken() {
  try {
    const response: GetAccessTokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    return response;
  } catch (err: unknown) {
    return { access_token: undefined };
  }
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response: SpotifyCurrentlyPlaying = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response;
}

export async function getTopTracks(range: TopTracksRange = 'short_term') {
  const { access_token } = await getAccessToken();
  const url = qs.stringifyUrl({
    url: TOP_TRACKS_ENDPOINT,
    query: {
      time_range: range,
    },
  });

  const response: SpotifyTopTracks = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response;
}
