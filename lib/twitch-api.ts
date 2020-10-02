import useSWR from 'swr'
import { TwitchData } from '../types/default'
import fetch from './fetch'

export async function getTwitchData(user: string | string[] = 'resir014', token: string) {
  console.log('Fetching broadcast info...')

  const apiUrl = `https://api.twitch.tv/helix/streams?user_login=${Array.isArray(user) ? user.join(',') : user}`

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID || ''
      }
    })

    return res
  } catch (err) {
    throw new Error('Unable to authenticate with Twitch API')
  }
}

export default async function fetchTwitchData(user = 'resir014'): Promise<TwitchData | undefined> {
  try {
    const data = await fetch(`/api/twitch-api/?user=${user}`)
    const streamInfo = Boolean(data?.data && data?.data[0])

    if (streamInfo && data?.data[0]?.type === 'live') {
      return data?.data[0]
    }

    return undefined
  } catch (err) {
    throw new Error(err)
  }
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
