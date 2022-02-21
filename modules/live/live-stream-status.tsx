import * as React from 'react';
import clsx from 'clsx';
import { useTwitchStreams } from '~/lib/twitch-api';

export interface LiveStreamStatusProps extends React.ComponentPropsWithoutRef<'div'> {
  username?: string;
}

export const LiveStreamStatus = React.forwardRef<HTMLDivElement, LiveStreamStatusProps>(
  ({ className, style, username = 'resir014', ...rest }, ref) => {
    const { data } = useTwitchStreams(username);

    const gameTitle = data?.game_name ?? undefined;
    const viewCount = data ? Intl.NumberFormat('en-GB').format(data.viewer_count) : undefined;

    return (
      <div
        className={clsx(
          'flex items-center space-x-4 relative leading-tight bg-chungking-grey-800 px-4 py-2 rounded-md shadow-single',
          className
        )}
        style={style}
        ref={ref}
        {...rest}
      >
        <div className="flex items-center space-x-2">
          <div
            className={clsx('w-3 h-3 rounded-full', data ? 'bg-red-500' : 'bg-chungking-grey-500')}
            aria-hidden
          />
          <span className="font-semibold text-chungking-white">{data ? 'Online' : 'Offline'}</span>
        </div>
        <a
          className="helper-link-cover text-chungking-grey-300"
          href={`https://www.twitch.tv/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data
            ? `Streaming ${gameTitle} for ${viewCount} viewers`
            : 'Follow to be notified when I go live!'}
        </a>
      </div>
    );
  }
);

LiveStreamStatus.displayName = 'LiveStreamStatus';
