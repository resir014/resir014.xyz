import markdownit from 'markdown-it';
import implicitFigures from 'markdown-it-implicit-figures';
import { markdownItShikiTwoslashSetup } from 'markdown-it-shiki-twoslash';

export async function renderMarkdown(markdown?: string) {
  const md = markdownit({
    html: true,
  });

  const shiki = await markdownItShikiTwoslashSetup({
    theme: 'github-dark',
  });

  md.use(implicitFigures);
  md.use(shiki);

  if (markdown) {
    const result = md.render(markdown);
    return result;
  }

  return null;
}
