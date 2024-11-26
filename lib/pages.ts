import type { BasePageProps } from '~/types/posts';
import { getContentFiles } from './content';
import { DEFAULT_PAGE_DIRECTORY, getPageBySlug } from './item-by-slug';

export async function getAllPages(
  fields: string[] = [],
  contentDirectory = DEFAULT_PAGE_DIRECTORY
) {
  const files = getContentFiles(contentDirectory);
  const pages: BasePageProps[] = [];

  for (const slug of files) {
    const page: BasePageProps = await getPageBySlug(slug, fields, contentDirectory);
    pages.push(page);
  }

  // sort posts by date in descending order
  return pages;
}
