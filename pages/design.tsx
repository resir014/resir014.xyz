import { NextPage } from 'next';
import * as React from 'react';
import { Content } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { ColorSpecs, ComponentSpecs, TypographySpecs } from '~/modules/design';
import { Post, PostBody, PostHeader } from '~/modules/posts';

const DesignPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Content pageTitle="Design">
        <Post>
          <PostHeader title="Chungking Design System" />
          <PostBody>
            <ColorSpecs />
            <TypographySpecs />
            <ComponentSpecs />
          </PostBody>
        </Post>
      </Content>
    </DefaultLayout>
  );
};

export default DesignPage;
