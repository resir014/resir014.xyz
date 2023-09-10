import { trpc } from './trpc';

export function useYouTubeChannelStatistics(channelId?: string) {
  const { data, isLoading, error } = trpc.youtube.getChannelStatistics.useQuery({
    channels: channelId ? [channelId] : undefined,
  });

  return {
    isLoading,
    data: data?.items?.[0] ?? undefined,
    error,
  } as const;
}
