import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';
import {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown,
} from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';
import type { Root } from 'mdast';
import type { Processor } from 'unified';
import { visit } from 'unist-util-visit';

// Syntax extensions that remark-parse and remark-stringify read from the processor data.
type SyntaxExtensionData = {
  micromarkExtensions?: unknown[];
  fromMarkdownExtensions?: unknown[];
  toMarkdownExtensions?: unknown[];
};

/**
 * Enables the two GFM extensions that markdown-it supports out of the box: tables and `~~double
 * tilde~~` strikethrough. Full GFM is turned off so that footnotes and bare URLs keep rendering as
 * plain text, the way they did with markdown-it. Strikethrough renders as `<s>`, like markdown-it.
 */
export default function remarkTablesStrikethrough(this: Processor) {
  const data = this.data() as SyntaxExtensionData;

  data.micromarkExtensions ??= [];
  data.fromMarkdownExtensions ??= [];
  data.toMarkdownExtensions ??= [];

  data.micromarkExtensions.push(gfmTable(), gfmStrikethrough({ singleTilde: false }));
  data.fromMarkdownExtensions.push(gfmTableFromMarkdown(), gfmStrikethroughFromMarkdown());
  data.toMarkdownExtensions.push(gfmTableToMarkdown(), gfmStrikethroughToMarkdown());

  return (tree: Root) => {
    visit(tree, 'delete', node => {
      node.data = { ...node.data, hName: 's' };
    });
  };
}
