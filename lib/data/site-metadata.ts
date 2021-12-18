import siteMetadata from '~/_data/site-metadata.json';

export type SiteAuthor = {
  readonly name: string;
  readonly description: string;
  readonly website: string;
  readonly avatar: string;
  readonly twitter: string;
  readonly url: { [key: string]: string };
  readonly email: string;
};

export type SiteMetadata = {
  readonly title: string;
  readonly description: string;
  readonly siteUrl: string;
  readonly flavourText?: string;
  readonly author: SiteAuthor;
};

export default siteMetadata as unknown as SiteMetadata;
