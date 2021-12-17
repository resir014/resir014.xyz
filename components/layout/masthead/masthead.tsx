import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import MastheadNav from './masthead-nav';
import { MenuProps } from '~/types/default';

interface MastheadProps extends MenuProps {
  title: string;
  className?: string;
}

const Masthead: React.FC<MastheadProps> = ({ className, title, items }) => {
  return (
    <header className={clsx('px-6 bg-chungking-grey-900 shadow-header-inset z-50', className)}>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:max-w-4xl xl:max-w-6xl mx-auto">
        <h1 className="text-center">
          <Link href="/">
            <a className="block pt-[8px] pb-[6px] lg:pt-[16px] lg:pb-[14px] font-bold border-b-2 border-transparent hover:border-chungking-white focus:border-chungking-white focus:bg-chungking-white focus:bg-[rgba(255,255,255,0.1)]">
              {title}
            </a>
          </Link>
        </h1>
        <nav>
          <MastheadNav items={items} />
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
