import clsx from 'clsx';
import * as React from 'react';
import { PlayCircle } from 'react-feather';
import { trpc } from '~/lib/trpc';

export function SpotifyCurrentlyPlaying() {
  const { data } = trpc.spotify.getCurrentlyPlaying.useQuery();

  return (
    <div className="flex items-start relative space-x-4 bg-chungking-grey-800 px-4 py-2 rounded-md shadow-single">
      <PlayCircle
        aria-hidden
        size={20}
        className={clsx(
          'flex-shrink-0',
          data?.isPlaying ? 'text-chungking-blue-500' : 'text-chungking-grey-300'
        )}
      />
      <p
        className="leading-tight"
        title={data ? `${data.title || 'Not Playing'} - ${data.artist || 'Spotify'}` : undefined}
      >
        {data?.songUrl ? (
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-chungking-white flex-1 min-w-0 hover:underline helper-link-cover"
          >
            {data.title}
          </a>
        ) : (
          <span className="font-semibold text-chungking-white flex-1 min-w-0">Not Playing</span>
        )}{' '}
        <span className="text-chungking-grey-300">–</span>&nbsp;
        <span className="text-chungking-grey-300">{data?.artist ?? 'Spotify'}</span>
      </p>
    </div>
  );
}
