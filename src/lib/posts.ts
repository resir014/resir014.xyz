import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  BaseBookmarkProps,
  BaseJamProps,
  BasePhotoProps,
  BasePostProps,
  BaseVideoProps,
} from '~/types/posts';

// Regex to parse the date and slug from a post's entry ID (`<kind>/YYYY-MM-DD-slug`)
const POST_ENTRY_ID_REGEX = /^[a-z]+\/([\d]{4})-([\d]{2})-([\d]{2})-(.+)$/;

export type PostPropsByKind = {
  article: BasePostProps;
  bookmark: BaseBookmarkProps;
  jam: BaseJamProps;
  photo: BasePhotoProps;
  video: BaseVideoProps;
};

export type PublishedPostKind = keyof PostPropsByKind;

function toPostProps(entry: CollectionEntry<'posts'>) {
  const match = entry.id.match(POST_ENTRY_ID_REGEX);

  if (!match) {
    throw new Error(`Post filename must be in the format YYYY-MM-DD-slug.md: ${entry.id}`);
  }

  const [, year, month, day, slug] = match;

  return {
    ...entry.data,
    slug: `${year}/${month}/${day}/${slug}`,
    // if no date set, generate from filename.
    date: entry.data.date ?? new Date(`${year}-${month}-${day}`).toISOString(),
    content: entry.rendered?.html ?? '',
  };
}

/**
 * Returns every post of a post kind, newest first. `slug` is `YYYY/MM/DD/slug` and `content` is the
 * rendered HTML of the post body.
 */
export async function getPosts<K extends PublishedPostKind>(kind: K) {
  const entries = await getCollection('posts', entry => entry.id.startsWith(`${kind}/`));
  const posts = entries.map(toPostProps) as Array<PostPropsByKind[K]>;

  return posts.sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date));
}

export async function getFeaturedArticles(maxPosts = 5) {
  const posts = await getPosts('article');
  return posts.filter(post => post.featured).slice(0, maxPosts);
}

export async function getFeaturedBookmarks(maxPosts = 3) {
  const posts = await getPosts('bookmark');
  return posts.slice(0, maxPosts);
}

export async function getFeaturedJam() {
  const posts = await getPosts('jam');
  return posts[0];
}

export async function getFeaturedVideo() {
  const posts = await getPosts('video');
  return posts[0];
}

export async function getFeaturedPhoto() {
  const posts = await getPosts('photo');
  return posts.filter(post => post.featured)[0];
}
