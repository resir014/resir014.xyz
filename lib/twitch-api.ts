import { stringifyUrl } from 'query-string'
import useSWR from 'swr'
import { TwitchData } from '../types/default'
import fetch from './fetch'

export async function getTwitchData(token: string, user: string | string[] = 'resir014') {
  console.log('Fetching broadcast info...')

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/streams',
    query: {
      user_login: Array.isArray(user) ? user.join(',') : user
    }
  })

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID || ''
      }
    })

    return res
  } catch (err) {
    throw new Error('Unable to authenticate with Twitch API')
  }
}

export async function getTwitchToken() {
  console.log('Requesting token from Twitch API...')

  const tokenUrl = stringifyUrl({
    url: 'https://id.twitch.tv/oauth2/token',
    query: {
      grant_type: 'client_credentials',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET
    }
  })

  return fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.TWITCH_CLIENT_ID || ''
    }
  }).then((data) => {
    if (data.access_token) {
      return data
    }

    throw new Error('Cannot retrieve access_token from Twitch API')
  })
}

export function useTwitchData(user = 'resir014') {
  const { data, error } = useSWR<{ data: TwitchData[] }>(`/api/twitch-api/?user=${user}`, fetch)
  const streamInfo = Boolean(data?.data && data?.data[0])

  return {
    data: streamInfo && data?.data[0]?.type === 'live' && data?.data[0]?.type === 'live' ? data?.data[0] : undefined,
    isLoading: !error && !data,
    isError: error
  }
}
