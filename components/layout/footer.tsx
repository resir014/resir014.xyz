import * as React from 'react';
import Link from 'next/link';

import { Container } from './container';
import footerLinks from '~/lib/data/footer-links';

export function Footer() {
  const handleOptOut = () => {
    if (typeof window.gaOptout === 'function') {
      window.gaOptout();
    }
  };

  return (
    <footer className="px-6 pt-8 pb-12">
      <Container>
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {footerLinks.map(item => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.path} as={item.as}>
                <a className="text-base text-chungking-grey-400 hover:text-chungking-grey-100">
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 text-center text-base text-chungking-grey-500">
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
      </Container>
    </footer>
  );
}
