import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

// Classes that `htmr-transform` added to these elements in the post body.
const elementClasses: Partial<Record<string, string[]>> = {
  iframe: ['w-full', 'aspect-video', 'rounded-lg', 'drop-shadow-lg', 'overflow-hidden'],
  pre: ['rounded-lg', 'drop-shadow-lg', 'overflow-hidden', 'lg:-mx-12'],
  figure: ['not-prose', 'space-y-2', 'text-center', 'lg:-mx-12'],
  figcaption: ['text-sm'],
  img: ['mx-auto', 'rounded-lg', 'drop-shadow-lg', 'bg-chungking-grey-800'],
};

/**
 * Adds the post body styles to embeds, code blocks, figures, and images, ahead of any classes
 * the content already has.
 */
export default function rehypeElementClasses() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      const classes = elementClasses[node.tagName];

      if (classes) {
        const className = node.properties.className;
        const existing = Array.isArray(className) ? className : [];
        node.properties.className = [...classes, ...existing];
      }
    });
  };
}
