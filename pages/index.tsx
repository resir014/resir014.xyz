import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import {
  HomepageContent,
  HomepageHero,
  HomepageIntroduction,
  HomepageSection,
} from '~/modules/home';
import { FeaturedProjectCard } from '~/modules/projects';
import { FeaturedPostList } from '~/modules/posts';

import {
  getFeaturedArticles,
  getFeaturedBookmarks,
  getFeaturedJam,
  getFeaturedPhoto,
  getFeaturedVideo,
} from '~/lib/posts';
import { getFeaturedProject } from '~/lib/projects';
import type {
  BaseBookmarkProps,
  BaseJamProps,
  BasePhotoProps,
  BasePostProps,
  BaseVideoProps,
} from '~/types/posts';
import { BookmarkList } from '~/modules/bookmarks';
import DefaultLayout from '~/layouts/default-layout';
import { Divider } from '~/components/ui';
import { Container } from '~/components/layout';

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = await getFeaturedArticles(3);
  const featuredBookmarks: BaseBookmarkProps[] = await getFeaturedBookmarks();
  const recentJam: BaseJamProps = await getFeaturedJam();
  const recentVideo: BaseVideoProps = await getFeaturedVideo();
  const featuredPhoto: BasePhotoProps = await getFeaturedPhoto();
  const featuredProject = await getFeaturedProject([
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug',
  ]);

  return {
    props: { allPosts, featuredBookmarks, recentJam, recentVideo, featuredPhoto, featuredProject },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ allPosts, featuredBookmarks, featuredProject }) => (
  <DefaultLayout>
    <NextSeo title="@resir014" titleTemplate="%s" openGraph={{ title: 'Home' }} />
    <HomepageHero />
    <HomepageContent>
      <Container size="md">
        <div className="space-y-12">
          <HomepageIntroduction />
          <Divider size="lg" />
          <HomepageSection
            title="Blog"
            description="Writings about web development, technology, and everything in between."
            callToAction={{ text: 'View all posts', href: '/posts' }}
          >
            <FeaturedPostList posts={allPosts} />
          </HomepageSection>
          <Divider size="lg" />
          <HomepageSection
            title="Reading list"
            description="What I've been reading."
            callToAction={{ text: 'View all bookmarks', href: '/bookmarks' }}
          >
            <BookmarkList bookmarks={featuredBookmarks} />
          </HomepageSection>
          {featuredProject ? (
            <>
              <Divider size="lg" />
              <HomepageSection
                title="Featured project"
                callToAction={{ text: 'View all projects', href: '/projects' }}
              >
                <FeaturedProjectCard project={featuredProject} />
              </HomepageSection>
            </>
          ) : null}
        </div>
      </Container>
    </HomepageContent>
  </DefaultLayout>
);

export default IndexPage;
