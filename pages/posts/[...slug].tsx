import * as React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'

import { getPostBySlug, getAllPosts } from '~/lib/posts'
import markdownToHtml from '~/lib/markdown-to-html'

import { Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import { PostBody, PostHeader, PostHeaderImage } from '~/modules/posts'
import CustomErrorPage from '~/pages/_error'
import { BasePostProps } from '~/types/posts'
import { SiteMetadata } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

type BlogPostPageProps = {
  post?: BasePostProps
  siteMetadata: SiteMetadata
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const { author } = siteMetadata
  if (post) {
    const { title, lead, category, date, header_image, content } = post
    return (
      <Page pageTitle={title}>
        <NextSeo
          openGraph={{
            type: 'article',
            title,
            description: lead,
            article: {
              authors: [siteMetadata.author.name],
              publishedTime: date,
              section: category
            },
            images: [
              {
                url: `${siteMetadata.siteUrl}${header_image}`,
                width: 1200,
                height: 630,
                alt: title
              }
            ]
          }}
        />
        <YouTubePreconnect />
        <Content>
          {header_image && <PostHeaderImage src={header_image} alt={title} />}
          <PostHeader title={title} lead={lead} author={author} category={category} date={date} />
          <PostBody content={content} />
        </Content>
      </Page>
    )
  }

  return <CustomErrorPage statusCode={404} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params && Array.isArray(ctx.params?.slug)) {
    const post = getPostBySlug(ctx.params.slug, ['category', 'title', 'lead', 'date', 'header_image', 'slug', 'content'])

    const content = await markdownToHtml(post.content || '')

    return {
      props: { siteMetadata, post: { ...post, content } }
    }
  }

  return {
    props: { siteMetadata }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split('/').filter(Boolean)
        }
      }
    }),
    fallback: false
  }
}

export default BlogPostPage
