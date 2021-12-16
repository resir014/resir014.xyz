import { NextApiHandler } from 'next';
import { getTwitchData, getTwitchToken } from '~/lib/twitch-api';

const handler: NextApiHandler = async (req, res) => {
  const { user } = req.query;

  try {
    const { access_token } = await getTwitchToken();

    if (access_token) {
      res.status(200).json(await getTwitchData(access_token, user));
    }
  } catch (err) {
    res.status(422).json(err);
  }
};

export default handler;
