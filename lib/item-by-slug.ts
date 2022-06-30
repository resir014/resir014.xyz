import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { PostKind } from '~/types/default';
import { renderMarkdown } from './markdown-to-html';
import { getContentDirectory } from './content';

export const DEFAULT_PAGE_DIRECTORY = '_content/pages';
export const DEFAULT_POST_DIRECTORY = '_content/posts';

export function getPageBySlug(
  slug: string,
  fields: string[] = [],
  contentDirectory: string = DEFAULT_PAGE_DIRECTORY
) {
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

export function getPostBySlug(
  paths: string[],
  fields: string[] = [],
  category: PostKind = 'article',
  contentDirectory: string = DEFAULT_POST_DIRECTORY
) {
  const [year, month, day, slug] = paths;
  const actualSlug = `${year}-${month}-${day}-${slug}.md`;
  const contents = fs.readFileSync(
    path.join(getContentDirectory(contentDirectory), category, actualSlug)
  );
  const { data, content } = matter(contents);

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = `${year}/${month}/${day}/${slug}`;
    }
    if (field === 'content') {
      items[field] = renderMarkdown(content || '');
    }
    // if no date set, generate from filename.
    if (field === 'date' && !data[field]) {
      items[field] = new Date(`${year}-${month}-${day}`).toISOString();
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}
