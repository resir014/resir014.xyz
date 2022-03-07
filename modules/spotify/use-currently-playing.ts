/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr';
import { CurrentlyPlayingResponse } from './types';
import fetch from '~/lib/fetch';

export function useCurrentlyPlaying({ refreshInterval = 10000 } = {}) {
  const { data, error } = useSWR<CurrentlyPlayingResponse>(
    '/api/spotify/currently-playing',
    fetch,
    { refreshInterval }
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  } as const;
}