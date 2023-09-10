import * as trpc from '@trpc/server';
import * as z from 'zod';
import { getNowPlaying, getTopTracks } from '~/lib/spotify';
import { CurrentlyPlayingResponse } from '~/modules/spotify/types';
import { publicProcedure, router } from '../trpc';

export const spotifyRouter = router({
  getCurrentlyPlaying: publicProcedure.query(async () => {
    try {
      const song = await getNowPlaying();

      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists.map(_artist => _artist.name).join(', ');
      const album = song.item.album.name;
      const albumImageUrl = song.item.album.images[0].url;
      const songUrl = song.item.external_urls.spotify;
      const id = song.item.id;

      return {
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        id,
      } as CurrentlyPlayingResponse;
    } catch (err: unknown) {
      return { isPlaying: false } as CurrentlyPlayingResponse;
    }
  }),
  getTopTracks: publicProcedure
    .input(
      z
        .object({
          range: z
            .union([z.literal('short_term'), z.literal('medium_term'), z.literal('long_term')])
            .optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const response = await getTopTracks(input?.range);

        const tracks = response.items.slice(0, 10).map(track => ({
          album: track.album.name,
          albumImageUrl: track.album.images[0].url,
          artist: track.artists.map(_artist => _artist.name).join(', '),
          songUrl: track.external_urls.spotify,
          title: track.name,
          id: track.id,
        }));

        return { tracks };
      } catch (err: unknown) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        });
      }
    }),
});
