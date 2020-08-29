export interface SyndicationFormat {
  name: string
  url: string
}

export interface SiteAuthor {
  name: string
  description: string
  website: string
  url: { [key: string]: string }
  email: string
}

export interface MenuItem {
  name: string
  path: string
  inverted?: boolean
}

export interface MenuProps {
  items: MenuItem[]
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
