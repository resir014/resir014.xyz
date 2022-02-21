import * as React from 'react';
import { TrackResponseItem } from './types';

export interface SpotifyTopTrackItemProps {
  index: number;
  track: TrackResponseItem;
}

export const SpotifyTopTrackItem: React.FC<SpotifyTopTrackItemProps> = ({ index, track }) => {
  const { title, artist, songUrl, albumImageUrl } = track;
  return (
    <div className="flex flex-row items-start relative space-x-2 py-2 border-b border-b-chungking-grey-800">
      <p className="flex-shrink-0 font-semibold select-none tabular-nums text-chungking-grey-400">
        {index.toString().padStart(2, '0')}
      </p>
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
    </div>
  );
};
