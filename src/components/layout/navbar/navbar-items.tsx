import * as React from 'react';
import clsx from 'clsx';
import type { MenuItem } from '~/lib/data/menu-items';

export interface NavbarItemsProps {
  items: MenuItem[];
  currentPath: string;
}

export const NavbarItems: React.FC<NavbarItemsProps> = ({ items, currentPath }) => {
  const isActiveRoute = React.useCallback(
    (path: string, isExact: boolean = false) => {
      if (isExact) {
        return currentPath === path;
      }

      return currentPath !== '/' && currentPath.startsWith(path);
    },
    [currentPath]
  );

  return (
    <ul className="flex flex-col lg:flex-row items-center lg:justify-end space-y-1 lg:space-y-0 lg:space-x-6 list-none">
      {items.map(item => {
        const isActive = isActiveRoute(item.as ?? item.path, item.exact);
        return (
          <li key={item.name} className="block w-full lowercase">
            <a
              href={item.as ?? item.path}
              className={clsx('block px-2 py-1 rounded-md', {
                'bg-chungking-white text-chungking-black font-semibold': isActive,
                'hover:bg-chungking-white/10 focus:bg-chungking-white/10': !isActive,
              })}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
