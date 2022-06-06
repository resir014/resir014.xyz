import { getContentFiles } from './content';
import { DEFAULT_PAGE_DIRECTORY, getPageBySlug } from './item-by-slug';

export function getAllPages(fields: string[] = [], contentDirectory = DEFAULT_PAGE_DIRECTORY) {
  const files = getContentFiles(contentDirectory);
  const pages = files
    .map(slug => getPageBySlug(slug, fields, contentDirectory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return pages;
}
