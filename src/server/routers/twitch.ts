import * as trpc from '@trpc/server';
import * as z from 'zod';
import type { TwitchAPIUserResponse } from '~/types/twitch';
import { publicProcedure, router } from '../trpc';
import {
  getTwitchFollowers,
  getTwitchStreams,
  getTwitchToken,
  getTwitchUsers,
} from '../data/twitch';

export const twitchRouter = router({
  getTwitchStreams: publicProcedure
    .input(
      z
        .object({
          users: z.union([z.string(), z.array(z.string())]).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { access_token } = await getTwitchToken();

        if (access_token) {
          const res = await getTwitchStreams(access_token, input?.users);
          return res;
        } else {
          throw new trpc.TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Failed to retrieve access token from Twitch.',
          });
        }
      } catch (err: unknown) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        });
      }
    }),
  getTwitchUsers: publicProcedure
    .input(
      z
        .object({
          users: z.union([z.string(), z.array(z.string())]).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { access_token } = await getTwitchToken();

        if (access_token) {
          const users = await getTwitchUsers(access_token, input?.users);

          if (users.data[0]) {
            const followers = await getTwitchFollowers(access_token, users.data[0].id);

            if (followers.total) {
              const userData: TwitchAPIUserResponse = {
                ...users.data[0],
                followers: followers.total,
              };

              return userData;
            } else {
              throw new trpc.TRPCError({
                code: 'UNPROCESSABLE_CONTENT',
                message: 'Followers data unavailable',
              });
            }
          } else {
            throw new trpc.TRPCError({
              code: 'UNPROCESSABLE_CONTENT',
              message: 'User data unavailable',
            });
          }
        } else {
          throw new trpc.TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No access token supplied',
          });
        }
      } catch (err: unknown) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        });
      }
    }),
});
