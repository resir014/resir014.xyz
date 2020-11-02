export type PostKind = 'article' | 'note' | 'bookmark' | 'jam' | 'video' | 'photo'

export interface SyndicationFormat {
  name: string
  url: string
}

export interface SiteAuthor {
  name: string
  description: string
  website: string
  avatar: string
  url: { [key: string]: string }
  email: string
}

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  flavourText?: string
  author: SiteAuthor
}

export interface MenuItem {
  name: string
  path: string
  as?: string
  inverted?: boolean
}

export interface MenuProps {
  items: MenuItem[]
}

export interface LinktreeItem {
  url: string
  title: string
  backgroundColor?: string
  textColor?: string
}

export interface LinktreeCategoryItem {
  category: string
  items: LinktreeItem[]
}

export interface TwitchData {
  id: string
  user_id: string
  user_name: string
  game_id: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
}
