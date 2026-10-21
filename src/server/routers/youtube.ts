import * as trpc from '@trpc/server';
import * as z from 'zod';
import { publicProcedure, router } from '../trpc';
import { getYouTubeChannelStatistics } from '../data/youtube';

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
