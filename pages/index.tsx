import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { HomepageContent, HomepageHero, HomepageSection } from '~/modules/home';
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
import {
  BaseBookmarkProps,
  BaseJamProps,
  BasePhotoProps,
  BasePostProps,
  BaseVideoProps,
} from '~/types/posts';
import { ProjectMetadata } from '~/types/projects';
import { BookmarkList } from '~/modules/bookmarks';
import DefaultLayout from '~/layouts/default-layout';
import { Divider } from '~/components/ui';

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles(3);
  const featuredBookmarks: BaseBookmarkProps[] = getFeaturedBookmarks();
  const recentJam: BaseJamProps = getFeaturedJam();
  const recentVideo: BaseVideoProps = getFeaturedVideo();
  const featuredPhoto: BasePhotoProps = getFeaturedPhoto();
  const featuredProject: ProjectMetadata = getFeaturedProject([
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
      <div className="space-y-12">
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
        <Divider size="lg" />
        <HomepageSection
          title="Featured project"
          callToAction={{ text: 'View all projects', href: '/projects' }}
        >
          <FeaturedProjectCard project={featuredProject} />
        </HomepageSection>
      </div>
    </HomepageContent>
  </DefaultLayout>
);

export default IndexPage;
