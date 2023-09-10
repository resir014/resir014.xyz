import { trpc } from './trpc';

export function useTwitchUsers(user = 'resir014') {
  const { data, isLoading, error } = trpc.twitch.getTwitchUsers.useQuery({
    users: user,
  });

  return {
    isLoading,
    data,
    error,
  } as const;
}

export function useTwitchStreams(user = 'resir014') {
  const { data, isLoading, error } = trpc.twitch.getTwitchStreams.useQuery({
    users: user,
  });
  const streamInfo = Boolean(data?.data && data.data[0]);

  return {
    isLoading,
    data: streamInfo && data?.data[0]?.type === 'live' ? data.data[0] : undefined,
    error,
  } as const;
}
