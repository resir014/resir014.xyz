import * as React from 'react';
import { MainContent } from '~/components/layout';
import { PageBody } from '~/components/page';
import { Divider } from '~/components/ui';
import DefaultLayout from '~/layouts/default-layout';
import { LiveStreamDashboard } from '~/modules/live/live-stream-dashboard';
import { Post, PostHeader } from '~/modules/posts';
import { SpotifyDashboard } from '~/modules/spotify/spotify-dashboard';
import type { NextPage } from '~/types/next';

const DashboardPage: NextPage = () => {
  return (
    <MainContent pageTitle="Dashboard">
      <Post>
        <PostHeader title="Dashboard" />
        <PageBody>
          <div className="space-y-12">
            <LiveStreamDashboard username="resir014" />
            <Divider size="lg" />
            <SpotifyDashboard />
          </div>
        </PageBody>
      </Post>
    </MainContent>
  );
};

DashboardPage.layout = page => <DefaultLayout>{page}</DefaultLayout>;

export default DashboardPage;
