/**
 * Used for generating page paths with prefix as used by gatsby-paginate.
 *
 * @param pathPrefix The pathPrefix passed by gatsby-paginate
 */
const withPathPrefix = (path: string, pathPrefix?: string) =>
  pathPrefix ? `/${pathPrefix}/${path}` : path

export default withPathPrefix
