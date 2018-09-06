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
