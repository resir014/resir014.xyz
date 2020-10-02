export type PostCategories = 'article' | 'note'

export interface PostMetadata {
  category: PostCategories
  title: string
  date: string
  slug: string
  featured?: boolean
  lead?: string
  header_image?: string
}

export interface PageMetadata {
  title: string
  slug: string
  lead?: string
  header_image?: string
}

export interface JamMetadata {
  category: PostCategories
  title: string
  date: string
  slug: string
  youtube_embed_id: string
}

export interface VideoMetadata {
  category: PostCategories
  title: string
  date: string
  slug: string
  youtube_embed_id: string
}

export interface BasePostProps extends PostMetadata {
  content: string
}

export interface BasePageProps extends PageMetadata {
  content: string
}

export interface BaseJamProps extends JamMetadata {
  content: string
}

export interface BaseVideoProps extends VideoMetadata {
  content: string
}
