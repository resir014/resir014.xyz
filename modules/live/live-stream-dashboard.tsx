import * as React from 'react';
import { useTwitchUsers } from '~/lib/twitch-api';
import { useYouTubeChannelStatistics } from '~/lib/youtube-api';
import { DashboardSection, DashboardSectionProps, StatBlock } from '../dashboard';
import { LiveStreamStatus } from './live-stream-status';

export interface LiveStreamDashboardProps extends Omit<DashboardSectionProps, 'title'> {
  username?: string;
  channelId?: string;
}

export const LiveStreamDashboard: React.FC<LiveStreamDashboardProps> = ({
  username = 'resir014',
  channelId = 'UCz6PytBicQeSimntcYkezIQ',
  ...rest
}) => {
  const { data: twitchData, isLoading: isTwitchLoading } = useTwitchUsers(username);
  const { data: youtubeData, isLoading: isYouTubeLoading } = useYouTubeChannelStatistics(channelId);

  return (
    <DashboardSection title="Livestream" {...rest}>
      <LiveStreamStatus username={username} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatBlock
          title="Twitch followers"
          count={Number(twitchData?.followers ?? 0)}
          isLoading={isTwitchLoading || !twitchData}
          externalLink="https://www.twitch.tv/resir014"
        />
        <StatBlock
          title="YouTube subscribers"
          count={Number(youtubeData?.statistics?.subscriberCount ?? 0)}
          isLoading={isYouTubeLoading || !youtubeData}
          externalLink="https://www.youtube.com/@resir014"
        />
      </div>
    </DashboardSection>
  );
};
