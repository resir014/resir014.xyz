import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { ProjectMetadata } from '~/types/projects'
import { getContentDirectory } from './content'

const contentDirectory = '_content/projects'

export function filterProjectsByCategory(projects: ProjectMetadata[]) {
  return [
    {
      title: 'Portfolio',
      category: 'portfolio',
      projects: projects.filter((project) => project.category === 'portfolio')
    },
    {
      title: 'Open-source stuff',
      category: 'oss',
      projects: projects.filter((project) => project.category === 'oss')
    },
    {
      title: 'Other stuff',
      category: 'other',
      projects: projects.filter((project) => project.category === 'other')
    }
  ]
}

export function getProjectPaths() {
  return fs.readdirSync(getContentDirectory(contentDirectory))
}

export function getProjectBySlug(slug: string, fields: string[] = []) {
  const actualSlug = slug.replace(/\.md$/, '')
  const contents = fs.readFileSync(path.join(getContentDirectory(contentDirectory), `${actualSlug}.md`))
  const { data, content } = matter(contents)

  const items: any = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = actualSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getProjectPaths()
  const posts = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getFeaturedProject(fields: string[] = []) {
  const projects = getAllProjects([...fields, 'featured'])
  return projects.find((project) => project.featured)
}
