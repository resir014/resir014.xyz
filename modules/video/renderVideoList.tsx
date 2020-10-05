import convert from 'htmr'
import Link from 'next/link'
import * as React from 'react'
import htmrTransform from '~/lib/htmr-transform'
import { BaseJamProps, BaseVideoProps } from '~/types/posts'
import { PostMeta } from '../posts'
import LiteYouTube from './LiteYouTube'
import VideoCard from './VideoCard'

export default function renderVideoList(allPosts: (BaseJamProps | BaseVideoProps)[], category: 'jam' | 'videos' = 'videos') {
  return allPosts.map((post) => (
    <VideoCard
      key={post.slug}
      metadata={<PostMeta category={post.category} date={post.date} />}
      title={
        <Link href={`/${category}/[...slug]`} as={`/${category}/${post.slug}`} passHref>
          <a>{post.title}</a>
        </Link>
      }
      embed={<LiteYouTube videoId={post.youtube_embed_id} />}
    >
      {convert(post.content, { transform: htmrTransform })}
    </VideoCard>
  ))
}
