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
      link?: string
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
    excerpt: string
    html: string
    fields: {
      year: string
      description: string
      tags: string
      slug: string
      headerImage: string
      category: string
      lead: string
      jumpToProject: string
      project_url: string
    }
    frontmatter: {
      title: string
    }
  }
}

export interface SocialLinkNode {
  node: {
    title: string
    url: string
    description: string
  }
}
