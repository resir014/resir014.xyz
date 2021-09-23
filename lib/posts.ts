import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { PostKind } from '~/types/default'
import { renderMarkdown } from './markdown-to-html'
import { getContentDirectory } from './content'

// Regex to parse date and title from the filename
const BLOG_POST_SLUG_REGEX = /^([\d]{4})-([\d]{2})-([\d]{2})-(.+)\.md$/

const contentDirectory = '_content/posts'

export function getPostPaths(category: PostKind = 'article') {
  return fs.readdirSync(path.join(getContentDirectory(contentDirectory), category))
}

export function getPostBySlug(paths: string[], fields: string[] = [], category: PostKind = 'article') {
  const [year, month, day, slug] = paths
  const actualSlug = `${year}-${month}-${day}-${slug}.md`
  const contents = fs.readFileSync(path.join(getContentDirectory(contentDirectory), category, actualSlug))
  const { data, content } = matter(contents)

  const items: any = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = `${year}/${month}/${day}/${slug}`
    }
    if (field === 'content') {
      items[field] = content
    }
    // if no date set, generate from filename.
    if (field === 'date' && !data[field]) {
      items[field] = new Date(`${year}-${month}-${day}`).toISOString()
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getPostParams(slug: string): string[] {
  const match = slug.match(BLOG_POST_SLUG_REGEX)

  if (match) {
    const [, year, month, day, actualSlug] = match
    return [year, month, day, actualSlug]
  }

  return []
}

export function getAllPosts(fields: string[] = [], category: PostKind = 'article') {
  const slugs = getPostPaths(category)
  const posts = slugs
    .map((slug) => getPostBySlug(getPostParams(slug), [...fields, 'date'], category))
    // sort posts by date in descending order
    .sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))

  return posts
}

export function getFeaturedArticles(maxPosts = 5) {
  return getAllPosts(['category', 'title', 'lead', 'slug', 'date', 'featured'], 'article')
    .filter((post) => post.featured)
    .slice(0, maxPosts)
}

export function getFeaturedBookmarks(maxPosts = 3) {
  return getAllPosts(['category', 'title', 'link', 'slug', 'date'], 'bookmark').slice(0, maxPosts)
}

export function getFeaturedJam() {
  const videos = getAllPosts(['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'], 'jam').map((post) => ({
    ...post,
    content: renderMarkdown(post.content || '')
  }))
  return videos[0]
}

export function getFeaturedVideo() {
  const videos = getAllPosts(['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'], 'video').map((post) => ({
    ...post,
    content: renderMarkdown(post.content || '')
  }))
  return videos[0]
}

export function getFeaturedPhoto() {
  const videos = getAllPosts(['category', 'slug', 'date', 'header_image', 'featured', 'content'], 'photo').filter((post) => post.featured)

  return videos[0]
}
