import * as React from 'react';
import { MainContent } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { ColorSpecs, LogoSpecs, TypographySpecs } from '~/modules/design';
import { Post, PostBody, PostHeader } from '~/modules/posts';
import type { NextPage } from '~/types/next';

const DesignPage: NextPage = () => {
  return (
    <MainContent pageTitle="Brand & Design" pageDescription="Design assets for the resir014 brand.">
      <Post>
        <PostHeader title="Brand & Design" />
        <PostBody>
          <div className="prose lg:prose-lg prose-base prose-invert prose-chungking">
            <LogoSpecs />
            <TypographySpecs />
            <ColorSpecs />
          </div>
        </PostBody>
      </Post>
    </MainContent>
  );
};

DesignPage.layout = page => <DefaultLayout>{page}</DefaultLayout>;

export default DesignPage;
