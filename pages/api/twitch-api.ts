import { NextApiRequest, NextApiResponse } from 'next'
import { getTwitchData } from '~/lib/twitch-api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Requesting token from Twitch API...')

  const { user } = req.query
  const TWITCH_API = 'https://id.twitch.tv/oauth2/token'
  const tokenUrl = `${TWITCH_API}?client_id=${process.env.GATSBY_TWITCH_CLIENT_ID}&client_secret=${process.env.GATSBY_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`

  fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID || ''
    }
  })
    .then((tokenResponse) => {
      if (tokenResponse.ok) {
        return tokenResponse.json()
      }

      throw new Error('Cannot retrieve access_token from Twitch API')
    })
    .then(async (json) => {
      const token = json.access_token
      res.status(200).json(await getTwitchData(token, user))
    })
    .catch((err) => {
      res.status(422).json(err)
    })
}

export default handler
