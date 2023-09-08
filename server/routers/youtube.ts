import * as trpc from '@trpc/server';
import { google } from 'googleapis';
import * as z from 'zod';
import { publicProcedure, router } from '../trpc';

async function getYouTubeChannelStatistics(channelId?: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  });

  const youtube = google.youtube({
    auth,
    version: 'v3',
  });

  const response = await youtube.channels
    .list({
      id: channelId,
      part: ['statistics'],
    })
    .then(res => res.data);

  return response;
}

export const youtubeRouter = router({
  getChannelStatistics: publicProcedure
    .input(
      z
        .object({
          channels: z.array(z.string()).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const res = await getYouTubeChannelStatistics(input?.channels);

        return res;
      } catch (err: unknown) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        });
      }
    }),
});
