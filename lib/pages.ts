import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { getContentDirectory, getContentFiles } from './content';
import { renderMarkdown } from './markdown-to-html';

export function getPageBySlug(contentDirectory: string, slug: string, fields: string[] = []) {
  const actualSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(getContentDirectory(contentDirectory), `${actualSlug}.md`);
  const contents = fs.readFileSync(fullPath);
  const { data, content } = matter(contents);

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = actualSlug;
    }
    if (field === 'content') {
      items[field] = renderMarkdown(content || '');
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPages(contentDirectory: string, fields: string[] = []) {
  const files = getContentFiles(contentDirectory);
  const pages = files
    .map(slug => getPageBySlug(contentDirectory, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return pages;
}
