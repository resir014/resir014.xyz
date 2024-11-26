import { Feed } from 'feed';
import type { BasePostProps } from '~/types/posts';
import siteMetadata from './data/site-metadata';
import { renderMarkdown } from './markdown-to-html';

export async function generateRSS(posts: BasePostProps[]) {
  const { title, description, siteUrl, author: authorMetadata } = siteMetadata;
  const updated = new Date();
  const author = {
    name: authorMetadata.name,
    link: authorMetadata.website,
    email: authorMetadata.email,
  };

  const feed = new Feed({
    title,
    description,
    id: `${siteUrl}/posts/`,
    link: `${siteUrl}/posts/`,
    copyright: '2016-present Resi Respati.',
    updated,
    author,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
  });

  for (const post of posts) {
    const url = `${siteUrl}/posts/${post.slug}/`;
    const content = await renderMarkdown(post.content || '');

    feed.addItem({
      content,
      title: post.title ?? '',
      id: url,
      link: url,
      description: post.lead,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  }

  return feed;
}
