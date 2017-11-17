import { GatsbyLinkProps } from 'gatsby-link'

export interface MenuItem {
  name: string
  path: string
  inverted?: boolean
}

export interface MenuProps {
  items: MenuItem[]
  pathname: string
}

export interface BlogPostNode {
  node: {
    html: string
    excerpt: string
    fields: {
      slug: string
      category?: string
      layout?: string
      headerImage?: string
      lead?: string
      date: string
    }
    frontmatter: {
      title?: string
      path?: string
      layout: string
    }
  }
}

export interface ProjectNode {
  node: {
    title: string
    year: string
    tags: string[]
    details: string
    url: string
  }
}

export interface SocialLinkNode {
  node: {
    title: string
    url: string
    description: string
  }
}
