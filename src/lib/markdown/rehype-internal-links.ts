import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Removes the trailing slash from root-relative links, so `/posts/2020/01/01/slug/` links straight
 * to the Permalink `/posts/2020/01/01/slug`, as `next/link` did.
 */
export default function rehypeInternalLinks() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      const href = node.properties.href;

      if (node.tagName !== 'a' || typeof href !== 'string' || !/^\/(?!\/)/.test(href)) {
        return;
      }

      node.properties.href = href.replace(/(.)\/+(?=$|[?#])/, '$1');
    });
  };
}
