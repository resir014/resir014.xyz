/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr';
import fetch from '~/lib/fetch';
import { TopTracksResponse } from './types';

export function useSpotifyTopTracks() {
  const { data, error } = useSWR<TopTracksResponse>('/api/spotify/top-tracks', fetch);

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  } as const;
}
