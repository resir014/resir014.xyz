import * as React from 'react';
import { StatBlock } from '../dashboard/stat-block';
import { useTwitchUsers } from '~/lib/twitch-api';

export interface LiveStreamDashboardProps {
  username?: string;
}

export const LiveStreamDashboard: React.FC<LiveStreamDashboardProps> = ({
  username = 'resir014',
}) => {
  const { data, isLoading } = useTwitchUsers(username);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StatBlock title="Twitch followers" count={data?.followers} isLoading={isLoading || !data} />
      <StatBlock
        title="Twitch viewers"
        count={data?.view_count}
        isLoading={isLoading || !data}
        externalLink="https://www.twitch.tv/resir014"
      />
    </div>
  );
};
