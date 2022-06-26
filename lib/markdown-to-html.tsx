import markdownit from 'markdown-it';
import implicitFigures from 'markdown-it-implicit-figures';
import shiki from 'markdown-it-shiki';

export function renderMarkdown(markdown: string) {
  const md = markdownit({
    html: true,
  });

  md.use(implicitFigures);
  md.use(shiki, {
    theme: 'github-dark',
  });
  const result = md.render(markdown);
  return result;
}
