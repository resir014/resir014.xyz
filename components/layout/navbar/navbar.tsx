import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Popover } from '@headlessui/react';
import { Menu as MenuIcon } from 'react-feather';

import { MenuItem } from '~/lib/data/menu-items';
import { NavbarItems } from './navbar-items';

export interface NavbarProps {
  title: string;
  className?: string;
  items: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ className, title, items }) => {
  return (
    <header
      className={clsx('bg-chungking-grey-900 border-b border-chungking-grey-800 z-50', className)}
    >
      <nav
        className="mx-auto flex lg:max-w-4xl xl:max-w-6xl items-center justify-between h-14 py-2 px-4 lg:px-6"
        aria-label="Global"
      >
        <div className="pt-[8px] pb-[6px] lg:pt-[16px] lg:pb-[14px]">
          <Link
            href="/"
            className="block px-2 py-1 rounded-md hover:bg-chungking-white/10 focus:bg-chungking-white/10"
          >
            <span className="text-chungking-white font-bold">{title}</span>
          </Link>
        </div>
        <Popover className="relative">
          {({ open }) => (
            <>
              <div className="flex lg:hidden">
                <Popover.Button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-chungking-white">
                  <span className="sr-only">{open ? 'Close' : 'Open'} main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden />
                </Popover.Button>
              </div>
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-[160px] -translate-x-0 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg bg-chungking-grey-900 shadow-double ring-1 ring-black ring-opacity-5 p-2">
                  <NavbarItems items={items} />
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavbarItems items={items} />
        </div>
      </nav>
    </header>
  );
};
