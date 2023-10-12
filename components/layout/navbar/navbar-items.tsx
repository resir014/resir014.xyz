/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { MenuItem } from '~/lib/data/menu-items';

export interface NavbarItemsProps {
  items: MenuItem[];
}

export const NavbarItems: React.FC<NavbarItemsProps> = ({ items }) => {
  const router = useRouter();

  const isActiveRoute = React.useCallback(
    (path: string, isExact: boolean = false) => {
      if (isExact) {
        return router.asPath === path;
      }

      return router.asPath !== '/' && router.asPath.startsWith(path);
    },
    [router.asPath]
  );

  return (
    <ul className="flex flex-col lg:flex-row items-center lg:justify-end space-y-1 lg:space-y-0 lg:space-x-6 list-none">
      {items.map(item => {
        const isActive = isActiveRoute(item.as ?? item.path, item.exact);
        return (
          <li key={item.name} className="block w-full lowercase">
            <Link
              href={item.path}
              as={item.as}
              className={clsx('block px-2 py-1 rounded-md', {
                'bg-chungking-white text-chungking-black font-semibold': isActive,
                'hover:bg-chungking-white/10 focus:bg-chungking-white/10': !isActive,
              })}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
