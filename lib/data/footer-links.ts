import footerLinks from '~/_data/footer-links.json';

export type MenuItem = {
  readonly name: string;
  readonly path: string;
  readonly as?: string;
};

export default footerLinks as unknown as MenuItem[];
