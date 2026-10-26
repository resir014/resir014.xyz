import { getCollection } from 'astro:content';
import type { BasePageProps } from '~/types/posts';

/**
 * Returns every page in a page collection (`pages` for top-level pages, `etc` for etc pages),
 * ordered by filename. `content` is the rendered HTML of the page body.
 */
export async function getPages(collection: 'pages' | 'etc' = 'pages') {
  const entries = await getCollection(collection);
  const pages: BasePageProps[] = entries.map(entry => ({
    ...entry.data,
    slug: entry.id,
    content: entry.rendered?.html ?? '',
  }));

  return pages.sort((page1, page2) => (page1.slug < page2.slug ? -1 : 1));
}
