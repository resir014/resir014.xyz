import * as React from 'react';
import { useTwitchUsers } from '~/lib/twitch-api';
import { DashboardSection, DashboardSectionProps, StatBlock } from '../dashboard';
import { LiveStreamStatus } from './live-stream-status';

export interface LiveStreamDashboardProps extends Omit<DashboardSectionProps, 'title'> {
  username?: string;
}

export const LiveStreamDashboard: React.FC<LiveStreamDashboardProps> = ({
  username = 'resir014',
  ...rest
}) => {
  const { data, isLoading } = useTwitchUsers(username);

  return (
    <DashboardSection title="Livestream" {...rest}>
      <LiveStreamStatus username={username} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatBlock
          title="Twitch followers"
          count={data?.followers}
          isLoading={isLoading || !data}
          externalLink="https://www.twitch.tv/resir014"
        />
        <StatBlock
          title="YouTube subscribers"
          count={0}
          externalLink="https://www.youtube.com/@resir014"
        />
      </div>
    </DashboardSection>
  );
};
