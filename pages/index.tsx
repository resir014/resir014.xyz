import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Stack, Anchor, Text } from '~/components/chungking-core'
import { Container, Page } from '~/components/layout'
import { HomepageContent, HomepageSection, HomepageSectionTitle } from '~/modules/home'
import { FeaturedProjectCard } from '~/modules/projects'
import { PostListItem } from '~/modules/posts'

import { getFeaturedArticles, getFeaturedJam, getFeaturedVideo } from '~/lib/posts'
import { getFeaturedProject } from '~/lib/projects'
import { BaseJamProps, BasePostProps, BaseVideoProps, PostMetadata } from '~/types/posts'
import { ProjectMetadata } from '~/types/projects'
import renderFeaturedVideo from '~/modules/video/renderFeaturedVideo'

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles()
  const recentJam: BaseJamProps = getFeaturedJam()
  const recentVideo: BaseVideoProps = getFeaturedVideo()
  const featuredProject: ProjectMetadata = getFeaturedProject([
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug'
  ])

  return {
    props: { allPosts: allPosts.slice(0, 3), recentJam, recentVideo, featuredProject }
  }
}

const LiveBanner = dynamic(() => import('~/modules/live/LiveBanner'))

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<IndexPageProps> = ({ allPosts, recentJam, recentVideo, featuredProject }) => (
  <Page>
    <LiveBanner />
    <HomepageContent>
      <Stack spacing={96}>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Featured articles</HomepageSectionTitle>
              <Stack spacing="xxl">
                {allPosts.map((post: PostMetadata) => (
                  <PostListItem key={post.slug} post={post} />
                ))}
              </Stack>
              <Text variant={500}>
                <Link href="/posts" passHref>
                  <Anchor>View all posts &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Currently listening to</HomepageSectionTitle>
              {renderFeaturedVideo(recentJam, 'jam')}
              <Text variant={500}>
                <Link href="/jam" passHref>
                  <Anchor>View all jams &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Recently watched</HomepageSectionTitle>
              {renderFeaturedVideo(recentVideo, 'videos')}
              <Text variant={500}>
                <Link href="/videos" passHref>
                  <Anchor>View all videos &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Featured project</HomepageSectionTitle>
              <FeaturedProjectCard project={featuredProject} />
              <Text variant={500}>
                <Link href="/projects" passHref>
                  <Anchor>View all projects &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
      </Stack>
    </HomepageContent>
  </Page>
)

export default IndexPage
