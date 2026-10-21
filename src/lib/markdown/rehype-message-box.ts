import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { messageBoxClassName } from '~/components/ui/message-box/message-box-class-name';

/**
 * Styles Callouts authored as raw `<div class="message">` / `<div class="message message--warning">`
 * HTML with the same classes as `MessageBox`. The original classes are replaced, as `MessageBox`
 * replaced them when `htmr` rendered the post body.
 */
export default function rehypeMessageBox() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'div') {
        return;
      }

      const className = node.properties.className;
      const classNames = Array.isArray(className) ? className.join(' ') : '';

      if (classNames.includes('message')) {
        const variant = classNames.includes('message--warning') ? 'warning' : 'default';
        node.properties.className = messageBoxClassName(variant).split(' ');
      }
    });
  };
}
