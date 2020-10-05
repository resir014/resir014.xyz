import siteMetadata from '~/_data/siteMetadata.json'

export const defaultOpenGraph = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  type: 'website',
  site_name: siteMetadata.title,
  images: [
    {
      url: `${siteMetadata.siteUrl}/social.png`,
      width: 1024,
      height: 512,
      alt: siteMetadata.title
    }
  ]
}

export const defaultTwitterCard = {
  cardType: 'summary_large_image',
  handle: siteMetadata.author.twitter,
  site: siteMetadata.author.twitter
}
