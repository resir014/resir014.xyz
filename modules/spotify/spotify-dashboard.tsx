import * as React from 'react';
import { DashboardSection, DashboardSectionProps } from '../dashboard';
import { SpotifyCurrentlyPlaying } from './spotify-currently-playing';
import { SpotifyTopTrackItem } from './spotify-top-track-item';
import { useSpotifyTopTracks } from './use-spotify-top-tracks';

export type SpotifyDashboardProps = Omit<DashboardSectionProps, 'title'>;

export const SpotifyDashboard: React.FC<SpotifyDashboardProps> = ({ ...rest }) => {
  const { data } = useSpotifyTopTracks();

  const renderTracks = () => {
    if (data) {
      return data.tracks.map((item, i) => (
        <SpotifyTopTrackItem key={item.id} index={i + 1} track={item} />
      ));
    }

    return Array.from({ length: 10 }).map((_, i) => (
      <SpotifyTopTrackItem key={i} index={i + 1} isSkeleton />
    ));
  };

  return (
    <DashboardSection title="Music" {...rest}>
      <SpotifyCurrentlyPlaying />
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">Top tracks</h3>
        <div>{renderTracks()}</div>
      </div>
    </DashboardSection>
  );
};
