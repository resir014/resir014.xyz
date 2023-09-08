import { trpc } from './trpc';

export function useYouTubeChannelStatistics(channelId = 'UCz6PytBicQeSimntcYkezIQ') {
  const { data, isLoading, error } = trpc.youtube.getChannelStatistics.useQuery({
    channels: [channelId],
  });

  return {
    isLoading,
    data: data?.items?.[0] ?? undefined,
    error,
  } as const;
}
