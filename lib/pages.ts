import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import matter from 'gray-matter'
import { getContentDirectory } from './content'

export function getPagePaths() {
  // Get all files within posts directory, then trim out the full path.
  return glob.sync(`${getContentDirectory('_content/pages')}/**/*`).map((file) => file.replace(/^.+\/_content\/pages\//, ''))
}

export function getPageBySlug(slug: string, fields: string[] = []) {
  const actualSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(getContentDirectory('_content/pages'), `${actualSlug}.md`)
  const contents = fs.readFileSync(fullPath)
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

export function getAllPages(fields: string[] = []) {
  const slugs = getPagePaths()
  const posts = slugs
    .map((slug) => getPageBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
