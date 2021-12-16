import * as React from 'react';
import { ErrorProps } from 'next/error';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { Anchor, Paragraph } from '@resir014/chungking-react';
import { Content, Page } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

const CustomErrorPage: React.FC<ErrorProps> = ({ statusCode, title }) => {
  const errorMessage = React.useMemo(() => title ?? statusCodes[statusCode], [statusCode, title]);

  return (
    <Page>
      <NextSeo title={`${statusCode}: ${errorMessage}`} noindex />
      <Content>
        <PostHeader title={`${statusCode}.`} />
        <PostBody>
          <Paragraph>
            You&apos;ve hit the void.{' '}
            <Link href="/" passHref>
              <Anchor>Go back home.</Anchor>
            </Link>
          </Paragraph>
        </PostBody>
      </Content>
    </Page>
  );
};

export default CustomErrorPage;
