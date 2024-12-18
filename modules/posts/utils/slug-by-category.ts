import type { PostKind } from '~/types/default';

export function slugByCategory(slug?: string, category: PostKind = 'article') {
  switch (category) {
    case 'article': {
      return `/posts/${slug}`;
    }
    case 'jam': {
      return `/jam/${slug}`;
    }
    case 'note': {
      return `/notes/${slug}`;
    }
    case 'photo': {
      return `/photos/${slug}`;
    }
    case 'video': {
      return `/videos/${slug}`;
    }
    default: {
      return `/posts/${slug}`;
    }
  }
}
