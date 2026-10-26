import siteMetadata from './data/site-metadata';

export interface OpenGraphImage {
  url: string;
  alt: string;
}

export interface OpenGraph {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: OpenGraphImage;
  article?: {
    publishedTime: string;
    section: string;
  };
}

export const defaultOpenGraphImage: OpenGraphImage = {
  url: `${siteMetadata.siteUrl}/social.png`,
  alt: siteMetadata.title,
};

export const defaultTwitterCard = {
  cardType: 'summary_large_image',
  handle: siteMetadata.author.twitter,
  site: siteMetadata.author.twitter,
};

/**
 * The Open Graph image for a Header image, or the default social card when there is none.
 */
export function headerImageOpenGraph(headerImage: string | undefined, alt: string) {
  return headerImage ? { url: `${siteMetadata.siteUrl}${headerImage}`, alt } : undefined;
}
