/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { MenuItem } from '~/lib/data/menu-items';

interface MastheadNavProps {
  items: MenuItem[];
}

const MastheadNav: React.FC<MastheadNavProps> = ({ items }) => {
  const router = useRouter();

  return (
    <ul className="flex items-center justify-around lg:justify-end lg:space-x-6 list-none">
      {items.map(item => {
        const isActive = router.asPath !== '/' && router.asPath.startsWith(item.as ?? item.path);
        return (
          <li key={item.name} className="lowercase">
            <Link href={item.path} as={item.as}>
              <a
                className={clsx(
                  'block pt-[8px] pb-[6px] lg:pt-[16px] lg:pb-[14px] border-b-2 hover:border-chungking-white focus:border-chungking-white focus:bg-chungking-white focus:bg-[rgba(255,255,255,0.1)]',
                  isActive ? 'border-chungking-white' : 'border-transparent'
                )}
              >
                {item.name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MastheadNav;
