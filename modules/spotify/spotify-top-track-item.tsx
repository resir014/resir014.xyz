import * as React from 'react';
import { TrackResponseItem } from './types';

export interface SpotifyTopTrackItemProps {
  index: number;
  track?: TrackResponseItem;
  isSkeleton?: boolean;
}

export const SpotifyTopTrackItem: React.FC<SpotifyTopTrackItemProps> = ({
  index,
  track,
  isSkeleton,
}) => {
  const renderTrackItem = () => {
    if (track && !isSkeleton) {
      const { albumImageUrl, songUrl, title, artist } = track;

      return (
        <>
          <img className="w-12 h-12" src={albumImageUrl} alt={`${title} - ${artist}`} />
          <div className="flex-1 min-w-0">
            <p className="flex items-center flex-1 min-w-0">
              <a
                className="helper-link-cover truncate font-semibold"
                href={songUrl}
                title={`${title} - ${artist}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </p>
            <span className="block flex-1 min-w-0 truncate text-chungking-grey-300">{artist}</span>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="block rounded-sm w-12 h-12 bg-chungking-grey-800" aria-hidden />
        <div className="flex-1 min-w-0">
          <div className="flex items-center h-6" aria-hidden>
            <div className="block flex-1 rounded-sm h-4 bg-chungking-grey-800" />
          </div>
          <div className="flex items-center h-6" aria-hidden>
            <div className="block flex-1 rounded-sm h-4 bg-chungking-grey-800" />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-row items-start relative space-x-2 py-2 border-b border-b-chungking-grey-800">
      <p className="flex-shrink-0 font-semibold select-none tabular-nums text-chungking-grey-400">
        {index.toString().padStart(2, '0')}
      </p>
      {renderTrackItem()}
    </div>
  );
};
