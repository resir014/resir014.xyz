import { NextPage } from 'next';
import * as React from 'react';
import { Content, Page } from '~/components/layout';
import { ColorSpecs, ComponentSpecs, TypographySpecs } from '~/modules/design';
import { Post, PostBody, PostHeader } from '~/modules/posts';

const DesignPage: NextPage = () => {
  return (
    <Page pageTitle="Design">
      <Content>
        <Post>
          <PostHeader title="Chungking Design System" />
          <PostBody>
            <ColorSpecs />
            <TypographySpecs />
            <ComponentSpecs />
          </PostBody>
        </Post>
      </Content>
    </Page>
  );
};

export default DesignPage;
