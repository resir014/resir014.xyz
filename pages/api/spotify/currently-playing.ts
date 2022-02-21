/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiHandler } from 'next';
import { getNowPlaying } from '~/lib/spotify';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const song = await getNowPlaying();

      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists.map(_artist => _artist.name).join(', ');
      const album = song.item.album.name;
      const albumImageUrl = song.item.album.images[0].url;
      const songUrl = song.item.external_urls.spotify;
      const id = song.item.id;

      return res.status(200).json({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        id,
      });
    } catch (err: unknown) {
      return res.status(200).json({ isPlaying: false });
    }
  }

  return res.status(404).json({ message: 'Not found' });
};

export default handler;
