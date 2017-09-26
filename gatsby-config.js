module.exports = {
  siteMetadata: {
    title: '@resir014',
    tagline: 'This is weird.',
    description: 'The somewhat generic landing page of @resir014.',
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
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet'
  ],
}
