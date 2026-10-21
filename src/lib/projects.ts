import { getCollection } from 'astro:content';
import type { BaseProjectProps, ProjectMetadata } from '~/types/projects';

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

/**
 * Returns every project, ordered by filename. `content` is the rendered HTML of the project body.
 */
export async function getProjects() {
  const entries = await getCollection('projects');
  const projects: BaseProjectProps[] = entries.map(entry => ({
    ...entry.data,
    slug: entry.id,
    content: entry.rendered?.html ?? '',
  }));

  return projects.sort((project1, project2) => (project1.slug < project2.slug ? -1 : 1));
}

export async function getFeaturedProject() {
  const projects = await getProjects();
  return projects.find(project => project.featured);
}
