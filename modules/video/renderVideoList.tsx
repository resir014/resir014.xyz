import convert from 'htmr';
import Link from 'next/link';
import * as React from 'react';
import { BaseJamProps, BaseVideoProps } from '~/types/posts';
import htmrTransform from '~/lib/htmr-transform';
import { PostDate } from '../posts/post-date';
import { LiteYouTube } from './lite-youtube';
import { VideoCard } from './video-card';

export default function renderVideoList(
  allPosts: (BaseJamProps | BaseVideoProps)[],
  category: 'jam' | 'videos' = 'videos'
) {
  return allPosts.map(post => (
    <VideoCard
      key={post.slug}
      metadata={<PostDate date={post.date} />}
      title={
        <Link href={`/${category}/[...slug]`} as={`/${category}/${post.slug}`} passHref>
          <a>{post.title}</a>
        </Link>
      }
      embed={<LiteYouTube videoId={post.youtube_embed_id} />}
    >
      {convert(post.content, { transform: htmrTransform })}
    </VideoCard>
  ));
}
