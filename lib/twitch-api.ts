import { stringifyUrl } from 'query-string';
import {
  HelixGetChannelFollowersResponse,
  HelixStreamsResponse,
  HelixUsersResponse,
  TwitchOAuthResponse,
} from '~/types/twitch';
import fetch from './fetch';
import { trpc } from './trpc';

export async function getTwitchStreams(token: string, user: string | string[] = 'resir014') {
  console.log('Fetching broadcast info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/streams',
    query: {
      user_login: Array.isArray(user) ? user.join(',') : user,
    },
  });

  try {
    const res = await fetch<HelixStreamsResponse>(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    });

    return res;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchUsers(token: string, user: string | string[] = 'resir014') {
  console.log('Fetching user info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/users',
    query: {
      login: Array.isArray(user) ? user.join(',') : user,
    },
  });

  try {
    const res = await fetch<HelixUsersResponse>(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    });

    return res;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchFollowers(token: string, user: string = '5162021') {
  console.log('Fetching broadcast info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/channels/followers',
    query: {
      broadcaster_id: user,
    },
  });

  try {
    const res = await fetch<HelixGetChannelFollowersResponse>(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    });

    return res;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchToken() {
  console.log('Requesting token from Twitch API...');

  const tokenUrl = stringifyUrl({
    url: 'https://id.twitch.tv/oauth2/token',
    query: {
      grant_type: 'client_credentials',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
    },
  });

  return fetch<TwitchOAuthResponse>(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
    },
  }).then(data => {
    if (data.access_token) {
      return data;
    }

    throw new Error('Cannot retrieve access_token from Twitch API');
  });
}

export function useTwitchUsers(user = 'resir014') {
  const { data, isLoading, error } = trpc.twitch.getTwitchUsers.useQuery({
    users: user,
  });

  return {
    isLoading,
    data,
    error,
  } as const;
}

export function useTwitchStreams(user = 'resir014') {
  const { data, isLoading, error } = trpc.twitch.getTwitchStreams.useQuery({
    users: user,
  });
  const streamInfo = Boolean(data?.data && data.data[0]);

  return {
    isLoading,
    data: streamInfo && data?.data[0]?.type === 'live' ? data.data[0] : undefined,
    error,
  } as const;
}
