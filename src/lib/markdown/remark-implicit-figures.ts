import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Renders an image that sits alone in its paragraph as `<figure><img></figure>`, matching
 * `markdown-it-implicit-figures` with its default options (no `<figcaption>`). Raw HTML `<img>`
 * tags are left alone.
 */
export default function remarkImplicitFigures() {
  return (tree: Root) => {
    visit(tree, 'paragraph', node => {
      if (node.children.length === 1 && node.children[0]?.type === 'image') {
        node.data = { ...node.data, hName: 'figure' };
      }
    });
  };
}
