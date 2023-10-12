import data from '~/_data/site-metadata.json';
import { getBaseUrl } from '../base-url';

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

const siteMetadata: SiteMetadata = {
  ...(data as unknown as SiteMetadata),
  siteUrl: getBaseUrl() || data.siteUrl,
};

export default siteMetadata as unknown as SiteMetadata;
