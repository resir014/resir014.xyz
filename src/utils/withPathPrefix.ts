/**
 * Used for generating page paths with prefix as used by gatsby-paginate.
 *
 * @param {string} path The current path.
 * @param {string} [pathPrefix] The pathPrefix passed by gatsby-paginate.
 */
export default function withPathPrefix(path: string, pathPrefix?: string): string {
  return pathPrefix ? `/${pathPrefix}/${path}` : path
}
