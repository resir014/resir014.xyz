import { NextPage } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { ColorSpecs, LogoSpecs } from '~/modules/design';
import { Post, PostBody, PostHeader } from '~/modules/posts';

const DesignPage: NextPage = () => {
  return (
    <DefaultLayout>
      <MainContent
        pageTitle="Brand & Design"
        pageDescription="Design assets for the resir014 brand."
      >
        <Post>
          <PostHeader title="Brand & Design" />
          <PostBody>
            <div className="prose lg:prose-lg prose-base prose-invert prose-chungking">
              <LogoSpecs />
              <ColorSpecs />
            </div>
          </PostBody>
        </Post>
      </MainContent>
    </DefaultLayout>
  );
};

export default DesignPage;
