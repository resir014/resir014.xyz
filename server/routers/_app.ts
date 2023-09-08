import { router } from '../trpc';
import { spotifyRouter } from './spotify';
import { twitchRouter } from './twitch';
import { youtubeRouter } from './youtube';

export const appRouter = router({
  twitch: twitchRouter,
  spotify: spotifyRouter,
  youtube: youtubeRouter,
});

export type AppRouter = typeof appRouter;
