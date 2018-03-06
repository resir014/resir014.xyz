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

export interface BlogPostField {
  node: BlogPostNode
}

export interface BlogPostNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    category?: string
    layout?: string
    link?: string
    headerImage?: string
    headerRegex?: string
    lead?: string
    date: string
  }
  frontmatter: {
    title?: string
    path?: string
    layout: string
    header_image?: {
      childImageSharp: {
        sizes: { [key: string]: any }
      }
    }
  }
}

export interface ProjectField {
  node: ProjectNode
}

export interface ProjectNode {
  excerpt: string
  html: string
  fields: {
    year: string
    description: string
    tags: string
    slug: string
    category: string
    lead: string
    jumpToProject: string
    project_url: string
  }
  frontmatter: {
    title: string
    header_image?: {
      childImageSharp: {
        sizes: { [key: string]: any }
      }
    }
  }
}

export interface SocialLinkField {
  node: SocialLinkNode
}

export interface SocialLinkNode {
  title: string
  url: string
  description: string
}
