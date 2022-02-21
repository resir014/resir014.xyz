import { NextPage } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import { PageBody } from '~/components/page';
import DefaultLayout from '~/layouts/default-layout';
import { DashboardSection } from '~/modules/dashboard/dashboard-section';
import { LiveStreamDashboard } from '~/modules/live/live-stream-dashboard';
import { LiveStreamStatus } from '~/modules/live/live-stream-status';
import { Post, PostHeader } from '~/modules/posts';

const DashboardPage: NextPage = () => {
  return (
    <DefaultLayout>
      <MainContent pageTitle="Dashboard">
        <Post>
          <PostHeader title="Dashboard" />
          <PageBody>
            <div className="space-y-12">
              <DashboardSection title="Livestream">
                <LiveStreamStatus />
                <LiveStreamDashboard />
              </DashboardSection>
            </div>
          </PageBody>
        </Post>
      </MainContent>
    </DefaultLayout>
  );
};

export default DashboardPage;
