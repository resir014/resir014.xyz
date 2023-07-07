import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { MenuItem } from '~/lib/data/menu-items';
import { Logo } from '~/components/ui';
import { NavbarItems } from './navbar-items';

export interface NavbarProps {
  title: string;
  className?: string;
  items: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ className, title, items }) => {
  return (
    <header
      className={clsx('px-4 lg:px-6 bg-chungking-grey-900 shadow-header-inset z-50', className)}
    >
      <div className="flex flex-col items-center lg:flex-row-reverse lg:justify-between w-full lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="flex items-center relative space-x-4">
          <h1 className="pt-[8px] pb-[6px] lg:pt-[16px] lg:pb-[14px] ">
            <Link href="/" className="font-bold helper-link-cover">
              {title}
            </Link>
          </h1>
          <div className="hidden lg:inline-flex items-center justify-center bg-chungking-black w-8 h-8 lg:w-14 lg:h-14">
            <span className="sr-only">@resir014</span>
            <Logo aria-hidden className="h-6 lg:h-10" />
          </div>
        </div>
        <nav>
          <NavbarItems items={items} />
        </nav>
      </div>
    </header>
  );
};
