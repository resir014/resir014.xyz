/**
 * The public path of the page being rendered, e.g. `/about` or `/`. Pages are built as `.html`
 * files (`build.format: 'file'`), which `Astro.url.pathname` includes when prerendering.
 */
export function getPagePath(url: URL) {
  return url.pathname.replace(/(\/index)?\.html$/, '') || '/';
}
