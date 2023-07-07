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
    <ul className="flex items-center lg:justify-end space-x-6 list-none">
      {items.map(item => {
        const isActive = isActiveRoute(item.as ?? item.path, item.exact);
        return (
          <li key={item.name} className="lowercase">
            <Link
              href={item.path}
              as={item.as}
              className={clsx(
                'block pt-[8px] pb-[6px] lg:pt-[16px] lg:pb-[14px] border-b-2 hover:border-chungking-white focus:border-chungking-white focus:bg-chungking-white focus:bg-[rgba(255,255,255,0.1)]',
                isActive ? 'border-chungking-white' : 'border-transparent'
              )}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
