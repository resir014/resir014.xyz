import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Renders images with a relative path as a plain `<img>`, with `src` as authored. Astro would
 * otherwise import them as image assets next to the Markdown file, but Content assets live in
 * `public/assets/` and are referenced by absolute path (ADR-0001 amendment).
 */
export default function remarkRelativeImages() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image, index, parent) => {
      if (!parent || index === undefined || URL.canParse(node.url) || node.url.startsWith('/')) {
        return;
      }

      // An unknown node type with `hName` becomes that element, and is skipped by Astro's image
      // collection, which only looks at `image` nodes.
      parent.children[index] = {
        type: 'relativeImage',
        data: {
          hName: 'img',
          hProperties: { src: node.url, alt: node.alt ?? '', title: node.title ?? undefined },
        },
      } as unknown as Image;
    });
  };
}
