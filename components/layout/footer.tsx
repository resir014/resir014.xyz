import * as React from 'react';
import Link from 'next/link';

import { Container } from './container';
import footerLinks from '~/lib/data/footer-links';
import { SpotifyCurrentlyPlaying } from '~/modules/spotify/spotify-currently-playing';

export function Footer() {
  const handleOptOut = () => {
    if (typeof window.gaOptout === 'function') {
      window.gaOptout();
    }
  };

  return (
    <footer className="px-6 pt-8 pb-12">
      <Container className="space-y-4 pt-8 border-t border-t-chungking-grey-800">
        <SpotifyCurrentlyPlaying />
        <div className="space-y-2">
          <nav className="-mx-4 -my-1 flex flex-wrap" aria-label="Footer">
            {footerLinks.map(item => (
              <div key={item.name} className="px-4 py-1">
                <Link href={item.path} as={item.as}>
                  <a className="text-sm text-chungking-grey-400 hover:text-chungking-grey-100">
                    {item.name}
                  </a>
                </Link>
              </div>
            ))}
          </nav>
          <div className="text-sm text-chungking-grey-500">
            <div className="-mx-2 -my-1">
              <p className="inline-block px-2 py-1">
                <a
                  className="hover:text-chungking-grey-100"
                  rel="license noopener noreferrer"
                  href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                >
                  CC-BY-NC-SA 4.0
                </a>
              </p>
              <p className="inline-block px-2 py-1">
                <a className="hover:text-chungking-grey-100" href="#" onClick={handleOptOut}>
                  Opt out of Google Analytics tracking.
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
