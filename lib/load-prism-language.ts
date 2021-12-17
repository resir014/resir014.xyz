/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import prism from 'prismjs';
import prismComponents from 'prismjs/components';

// Get the real name of a language given it or an alias
function getBaseLanguageName(
  nameOrAlias: string,
  components: typeof prismComponents = prismComponents
) {
  if (components.languages[nameOrAlias]) {
    return nameOrAlias;
  }
  return Object.keys(components.languages).find(language => {
    const { alias } = components.languages[language];
    if (!alias) return false;
    if (Array.isArray(alias)) {
      return alias.includes(nameOrAlias);
    }

    return alias === nameOrAlias;
  });
}

export default function loadPrismLanguage(language: string): void {
  const baseLanguage = getBaseLanguageName(language);

  if (!baseLanguage) {
    throw new Error(`Prism does not support ${baseLanguage}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (prism.languages[baseLanguage]) {
    return;
  }

  const languageData = prismComponents.languages[baseLanguage];

  if (languageData.option === 'default') {
    return;
  }

  if (languageData.require) {
    // Load the required language first
    if (Array.isArray(languageData.require)) {
      languageData.require.forEach(loadPrismLanguage);
    } else {
      loadPrismLanguage(languageData.require);
    }
  }

  require(`prismjs/components/prism-${baseLanguage}.js`);
}
