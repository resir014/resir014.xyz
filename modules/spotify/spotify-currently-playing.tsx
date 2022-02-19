import clsx from 'clsx';
import * as React from 'react';
import { PlayCircle } from 'react-feather';
import { useCurrentlyPlaying } from './use-currently-playing';

export function SpotifyCurrentlyPlaying() {
  const { data } = useCurrentlyPlaying();

  return (
    <div className="flex items-start space-x-4 bg-chungking-grey-800 px-4 py-2 rounded-md">
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
        <span className="font-semibold text-chungking-white flex-1 min-w-0">
          {data?.title ?? 'Not Playing'}
        </span>{' '}
        <span className="text-chungking-grey-300">–</span>&nbsp;
        <span className="text-chungking-grey-300">{data?.artist ?? 'Spotify'}</span>
      </p>
    </div>
  );
}
