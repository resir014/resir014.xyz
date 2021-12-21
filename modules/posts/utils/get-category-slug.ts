import { PostKind } from '~/types/default';

function getCategorySlug(category: PostKind = 'article') {
  switch (category) {
    case 'article': {
      return `/posts/`;
    }
    case 'jam': {
      return `/jam/`;
    }
    case 'note': {
      return `/notes/`;
    }
    case 'photo': {
      return `/photos/`;
    }
    case 'video': {
      return `/videos/`;
    }
    default: {
      return `/posts/`;
    }
  }
}

export default getCategorySlug;
