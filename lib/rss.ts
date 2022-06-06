import { Feed } from 'feed';
import siteMetadata from './data/site-metadata';
import { renderMarkdown } from './markdown-to-html';
import { BasePostProps } from '~/types/posts';

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

  posts.forEach(post => {
    console.log(post);
    const url = `${siteUrl}/posts/${post.slug}/`;

    feed.addItem({
      title: post.title ?? '',
      id: url,
      link: url,
      description: post.lead,
      content: renderMarkdown(post.content || ''),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return feed;
}
