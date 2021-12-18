export type PostKind = 'article' | 'note' | 'bookmark' | 'jam' | 'video' | 'photo';

export interface SyndicationFormat {
  name: string;
  url: string;
}
