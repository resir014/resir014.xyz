import markdownit from 'markdown-it';
import implicitFigures from 'markdown-it-implicit-figures';

export async function renderMarkdown(markdown: string) {
  const md = markdownit({
    html: true,
  });

  const shiki = await import('markdown-it-shiki').then(mod => mod.default);

  md.use(implicitFigures);
  md.use(shiki, {
    theme: 'github-dark',
  });
  const result = md.render(markdown);
  return result;
}
