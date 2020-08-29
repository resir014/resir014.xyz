import { TwitchData } from '../types/default'

export default async function fetchTwitchData(user?: string): Promise<TwitchData | undefined> {
  try {
    const data = await fetch(
      `http://localhost:8888/.netlify/functions/twitch-api?user=${user || 'resir014'}`
    )
    const response = await data.json()
    const streamInfo = Boolean(response.data && response.data[0])

    if (streamInfo && response.data[0].type === 'live') {
      return response.data[0]
    }

    return undefined
  } catch (err) {
    throw new Error(err)
  }
}
