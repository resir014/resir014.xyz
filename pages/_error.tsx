import * as React from 'react';
import { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';

import { MainContent } from '~/components/layout';
import { Page, PageBody } from '~/components/page';
import DefaultLayout from '~/layouts/default-layout';
import { statusCodes } from '~/lib/status-codes';
import { PostHeader } from '~/modules/posts';

function CustomErrorPage({ statusCode, title }: ErrorProps) {
  const errorMessage = title ?? statusCodes[statusCode];

  return (
    <DefaultLayout>
      <NextSeo title={`${statusCode}: ${errorMessage}`} noindex />
      <MainContent>
        <Page>
          <PostHeader title={`${statusCode}.`} />
          <PageBody htmlContent={'<p>You\'ve hit the void. <a href="/">Go back home</a></p>'} />
        </Page>
      </MainContent>
    </DefaultLayout>
  );
}

export default CustomErrorPage;
