export type PostKind = 'article' | 'note' | 'bookmark' | 'jam' | 'video' | 'photo';

export interface SyndicationFormat {
  name: string;
  url: string;
}

export interface SiteAuthor {
  name: string;
  description: string;
  website: string;
  avatar: string;
  url: { [key: string]: string };
  email: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  flavourText?: string;
  author: SiteAuthor;
}

export interface MenuItem {
  name: string;
  path: string;
  as?: string;
  inverted?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
}

export interface LinktreeItem {
  url: string;
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface LinktreeCategoryItem {
  category: string;
  items: LinktreeItem[];
}
