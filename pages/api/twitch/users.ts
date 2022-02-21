import { NextApiHandler } from 'next';
import { getTwitchFollowers, getTwitchToken, getTwitchUsers } from '~/lib/twitch-api';
import { TwitchAPIUserResponse } from '~/types/twitch';

const handler: NextApiHandler = async (req, res) => {
  const { user } = req.query;

  try {
    const { access_token } = await getTwitchToken();

    if (access_token) {
      const users = await getTwitchUsers(access_token, user);

      if (users.data[0]) {
        const followers = await getTwitchFollowers(access_token, users.data[0].id);

        if (followers.total) {
          const userData: TwitchAPIUserResponse = {
            ...users.data[0],
            followers: followers.total,
          };

          res.status(200).json(userData);
        } else {
          res.status(422).json({ status: 'error', message: 'Followers data unavailable' });
        }
      } else {
        res.status(422).json({ status: 'error', message: 'User data unavailable' });
      }
    } else {
      res.status(401).json({ status: 'error', message: 'No access token supplied' });
    }
  } catch (err: unknown) {
    res.status(422).json(err);
  }
};

export default handler;
