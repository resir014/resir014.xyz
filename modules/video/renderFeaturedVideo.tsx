import convert from 'htmr';
import Link from 'next/link';
import * as React from 'react';
import { BaseJamProps, BaseVideoProps } from '~/types/posts';
import htmrTransform from '~/lib/htmr-transform';
import { PostMeta } from '../posts';
import { LiteYouTube } from './lite-youtube';
import { VideoCard } from './video-card';

export default function renderFeaturedVideo(
  featuredPost: BaseJamProps | BaseVideoProps,
  category: 'jam' | 'videos' = 'videos'
) {
  return (
    <VideoCard
      metadata={
        <PostMeta
          category={featuredPost.category}
          date={featuredPost.date}
          slug={featuredPost.slug}
        />
      }
      title={
        <Link href={`/${category}/[...slug]`} as={`/${category}/${featuredPost.slug}`}>
          {featuredPost.title}
        </Link>
      }
      embed={<LiteYouTube videoId={featuredPost.youtube_embed_id} />}
    >
      {convert(featuredPost.content, { transform: htmrTransform })}
    </VideoCard>
  );
}
