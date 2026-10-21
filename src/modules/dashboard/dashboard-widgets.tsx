import * as React from 'react';
import { Divider } from '~/components/ui';
import { TrpcProvider } from '~/lib/trpc-provider';
import { LiveStreamDashboard } from '../live/live-stream-dashboard';
import { SpotifyDashboard } from '../spotify/spotify-dashboard';

/**
 * The Dashboard's live widgets, hydrated as one island.
 */
export function DashboardWidgets() {
  return (
    <TrpcProvider>
      <div className="space-y-12">
        <LiveStreamDashboard username="resir014" />
        <Divider size="lg" />
        <SpotifyDashboard />
      </div>
    </TrpcProvider>
  );
}
