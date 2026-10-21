import * as React from 'react';

export function GaOptOutLink() {
  const handleOptOut = () => {
    if (typeof window.gaOptout === 'function') {
      window.gaOptout();
    }
  };

  return (
    <a className="hover:text-chungking-grey-100" href="#" onClick={handleOptOut}>
      Opt out of Google Analytics tracking.
    </a>
  );
}
