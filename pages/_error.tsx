import * as React from 'react';
import { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';

import { MainContent } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { Page, PageBody } from '~/components/page';
import { PostHeader } from '~/modules/posts';

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

function CustomErrorPage({ statusCode, title }: ErrorProps) {
  const errorMessage = React.useMemo(() => title ?? statusCodes[statusCode], [statusCode, title]);

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
