/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiHandler } from 'next';
import { getTopTracks, TopTracksRange } from '~/lib/spotify';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { range } = req.query;
      const response = await getTopTracks(range as TopTracksRange);

      const tracks = response.items.slice(0, 10).map(track => ({
        album: track.album.name,
        albumImageUrl: track.album.images[0].url,
        artist: track.artists.map(_artist => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        id: track.id,
      }));

      return res.status(200).json({ tracks });
    } catch (err: unknown) {
      return res.status(400).json({ message: 'An error occured' });
    }
  }

  return res.status(404).json({ message: 'Not found' });
};

export default handler;
