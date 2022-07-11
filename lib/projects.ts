import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { BaseProjectProps, ProjectMetadata } from '~/types/projects';
import { getContentDirectory } from './content';
import { renderMarkdown } from './markdown-to-html';

const contentDirectory = '_content/projects';

export function filterProjectsByCategory(projects: ProjectMetadata[]) {
  return [
    {
      title: 'Portfolio',
      category: 'portfolio',
      projects: projects.filter(project => project.category === 'portfolio'),
    },
    {
      title: 'Open-source stuff',
      category: 'oss',
      projects: projects.filter(project => project.category === 'oss'),
    },
    {
      title: 'Other stuff',
      category: 'other',
      projects: projects.filter(project => project.category === 'other'),
    },
  ];
}

export function getProjectPaths() {
  return fs.readdirSync(getContentDirectory(contentDirectory));
}

export async function getProjectBySlug(slug: string, fields: string[] = []) {
  const actualSlug = slug.replace(/\.md$/, '');
  const contents = fs.readFileSync(
    path.join(getContentDirectory(contentDirectory), `${actualSlug}.md`)
  );
  const { data, content } = matter(contents);

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  for (const field of fields) {
    if (field === 'slug') {
      items[field] = actualSlug;
    }

    if (field === 'content') {
      items[field] = await renderMarkdown(content);
    }

    if (data[field]) {
      items[field] = data[field];
    }
  }

  return items;
}

export async function getAllProjects(fields: string[] = []) {
  const slugs = getProjectPaths();
  const posts: BaseProjectProps[] = [];

  for (const slug of slugs) {
    const post: BaseProjectProps = await getProjectBySlug(slug, fields);
    posts.push(post);
  }

  console.log(posts);
  return posts;
}

export async function getFeaturedProject(fields: string[] = []) {
  const projects = await getAllProjects([...fields, 'featured']);
  return projects.find(project => project.featured);
}
