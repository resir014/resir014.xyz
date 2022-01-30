import clsx from 'clsx';
import * as React from 'react';
import { PlayCircle } from 'react-feather';
import { useCurrentlyPlaying } from './use-currently-playing';

export function SpotifyCurrentlyPlaying() {
  const { data } = useCurrentlyPlaying();

  return (
    <div className="inline-flex items-start space-x-2">
      <PlayCircle
        aria-hidden
        size={24}
        className={clsx(
          'flex-shrink-0',
          data?.isPlaying ? 'text-chungking-blue-500' : 'text-chungking-grey-300'
        )}
      />
      <p className="inline-block">
        <span className="font-semibold text-chungking-white">{data?.title ?? 'Not Playing'}</span>{' '}
        <span className="text-chungking-grey-300">–</span>&nbsp;
        <span className="text-chungking-grey-300">{data?.artist ?? 'Spotify'}</span>
      </p>
    </div>
  );
}
