import * as React from 'react';
import { Popover } from '@headlessui/react';
import { Menu as MenuIcon } from 'react-feather';

import { NavbarItems, type NavbarItemsProps } from './navbar-items';

export type NavbarMenuProps = NavbarItemsProps;

/**
 * The mobile navigation menu.
 */
export const NavbarMenu: React.FC<NavbarMenuProps> = ({ items, currentPath }) => {
  return (
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
              <NavbarItems items={items} currentPath={currentPath} />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
