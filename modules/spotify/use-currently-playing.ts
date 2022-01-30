/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr';
import { CurrentlyPlayingResponse } from './types';
import fetch from '~/lib/fetch';

export function useCurrentlyPlaying() {
  const { data, error } = useSWR<CurrentlyPlayingResponse>('/api/spotify/currently-playing', fetch);

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  } as const;
}
