import { router } from '../trpc';
import { spotifyRouter } from './spotify';
import { twitchRouter } from './twitch';

export const appRouter = router({
  twitch: twitchRouter,
  spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
