import type { APIRoute } from 'astro';
import { getArticlesFeed } from '~/lib/rss';

export const GET: APIRoute = async () => new Response((await getArticlesFeed()).atom1());
