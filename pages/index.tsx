import { css } from '@emotion/core'
import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { Stack, Anchor } from '~/components/chungking-core'
import { Container, Page } from '~/components/layout'
import { HomepageContent, HomepageSection, HomepageSectionTitle, HomepageHero, LiveBanner } from '~/modules/home'
import { FeaturedProjectCard } from '~/modules/projects'
import { LiteYouTube, VideoCard } from '~/modules/video'
import { PostListItem, PostMeta } from '~/modules/posts'

import { getFeaturedArticles, getFeaturedJam } from '~/lib/posts'
import { getFeaturedProject } from '~/lib/projects'
import { BaseJamProps, BasePostProps, PostMetadata } from '~/types/posts'
import { ProjectMetadata } from '~/types/projects'

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles()
  const recentJam: BaseJamProps = getFeaturedJam()
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
    props: { allPosts: allPosts.slice(0, 3), recentJam, featuredProject }
  }
}

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<IndexPageProps> = ({ allPosts, recentJam, featuredProject }) => (
  <Page>
    <HomepageHero>
      <LiveBanner />
    </HomepageHero>
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
              <Link href="/posts" passHref>
                <Anchor variant={500}>View all posts &rarr;</Anchor>
              </Link>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Currently listening to</HomepageSectionTitle>
              <VideoCard
                metadata={<PostMeta category={recentJam.category} date={recentJam.date} />}
                title={
                  <Link href="/jam/[...slug]/" as={`/jam/${recentJam.slug}/`} passHref>
                    <a
                      css={css`
                        &::after {
                          content: '';
                          position: absolute;
                          left: 0;
                          top: 0;
                          right: 0;
                          bottom: 0;
                        }
                      `}
                    >
                      {recentJam.title}
                    </a>
                  </Link>
                }
                embed={<LiteYouTube videoId={recentJam.youtube_embed_id} />}
              />
              <Link href="/jam" passHref>
                <Anchor variant={500}>View all jams &rarr;</Anchor>
              </Link>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Featured project</HomepageSectionTitle>
              <FeaturedProjectCard project={featuredProject} />
              <Link href="/projects" passHref>
                <Anchor variant={500}>View all projects &rarr;</Anchor>
              </Link>
            </Stack>
          </Container>
        </HomepageSection>
      </Stack>
    </HomepageContent>
  </Page>
)

export default IndexPage
