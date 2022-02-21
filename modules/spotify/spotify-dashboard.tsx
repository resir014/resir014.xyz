import * as React from 'react';
import { DashboardSection, DashboardSectionProps } from '../dashboard';
import { SpotifyCurrentlyPlaying } from './spotify-currently-playing';

export type SpotifyDashboardProps = Omit<DashboardSectionProps, 'title'>;

export const SpotifyDashboard: React.FC<SpotifyDashboardProps> = ({ ...rest }) => {
  return (
    <DashboardSection title="Music" {...rest}>
      <SpotifyCurrentlyPlaying />
    </DashboardSection>
  );
};
