import prism from 'prismjs';
import markdownit from 'markdown-it';
import implicitFigures from 'markdown-it-implicit-figures';
import loadPrismLanguage from './load-prism-language';

export function renderMarkdown(markdown: string) {
  const md = markdownit({
    html: true,
    highlight: (code, lang) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!prism.languages[lang]) {
        try {
          loadPrismLanguage(lang);
        } catch (e) {
          let message = null;

          if (lang === 'none') {
            return code;
          }

          message = `unable to find prism language '${lang}' for parsing`;

          console.warn(message);
          return code;
        }
      }

      const grammar = prism.languages[lang];
      const highlightedCode = prism.highlight(code, grammar, lang);
      return highlightedCode;
    },
  });

  md.use(implicitFigures);
  const result = md.render(markdown);
  return result;
}
