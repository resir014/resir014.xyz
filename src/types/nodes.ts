import { SyndicationFormat } from './default'
import { Fluid, Fixed } from './gatsby'

export interface SocialLinkNode {
  title: string
  url: string
  description: string
}

export interface PageNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    headerImage?: string
    lead?: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
    header_image?: {
      childImageSharp: {
        fluid: Fluid
      }
    }
  }
}

export interface JamNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    category?: string
    link?: string
    lead?: string
    youtube_embed_id?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
  }
}

export interface NotesNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    category?: string
    link?: string
    lead?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
  }
}

export interface BookmarkNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    category?: string
    link?: string
    lead?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
  }
}

export interface PhotoNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    category?: string
    link?: string
    headerImage?: string
    lead?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
    header_image: {
      childImageSharp: {
        fixed: Fixed
        fluid: Fluid
      }
    }
  }
}

export interface BlogPostNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    category?: string
    layout?: string
    link?: string
    youtube_embed_id?: string
    headerImage?: string
    headerRegex?: string
    lead?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
    syndication?: SyndicationFormat[]
    header_image?: {
      childImageSharp: {
        fixed: Fixed
        fluid: Fluid
      }
    }
  }
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
        fixed: Fixed
        fluid: Fluid
      }
    }
  }
}

export interface VideoNode {
  html: string
  excerpt: string
  fields: {
    slug: string
    layout?: string
    category?: string
    link?: string
    headerImage?: string
    youtube_embed_id?: string
    lead?: string
    date: string
    date_ogp: string
  }
  frontmatter: {
    title: string
    path?: string
    layout: string
  }
}
