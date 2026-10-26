import * as React from 'react';

export default function usePrefetch(kind: 'preload' | 'preconnect', url: string, as?: string) {
  React.useEffect(() => {
    const linkElem = document.createElement('link');
    linkElem.rel = kind;
    linkElem.href = url;
    if (as) {
      linkElem.as = as;
    }
    // crossorigin should really only be set on script
    linkElem.crossOrigin = as === 'script' ? 'true' : null;
    document.head.appendChild(linkElem);

    return () => {
      document.head.removeChild(linkElem);
    };
  }, [kind, url, as]);
}
