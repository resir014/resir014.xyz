module.exports = {
  siteMetadata: {
    title: '@resir014',
    tagline: 'This is weird.',
    description: 'Web developer based in Jakarta, Indonesia.',
    author: {
      name: 'Resi Respati',
      url: 'https://twitter.com/resir014',
      email: 'resir014@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://resir014.xyz',
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet'
  ]
}
