import siteMetadata from './data/site-metadata';

export const defaultOpenGraph = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  type: 'website',
  site_name: siteMetadata.title,
  images: [
    {
      url: `${siteMetadata.siteUrl}/social.png`,
      width: 1200,
      height: 630,
      alt: siteMetadata.title,
    },
  ],
};

export const defaultTwitterCard = {
  cardType: 'summary_large_image',
  handle: siteMetadata.author.twitter,
  site: siteMetadata.author.twitter,
};
