import menuItems from '~/_data/menu-items.json';

export type MenuItem = {
  readonly name: string;
  readonly path: string;
  readonly as?: string;
  readonly exact?: boolean;
};

export default menuItems as unknown as MenuItem[];
