import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keep the raw filename as the entry ID. The default ID generator slugifies filenames, which
// would rewrite permalinks such as `2020-11-19-tailwindcss-2.0` or `kawalcovid19.id`.
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

const syndication = z.object({
  name: z.string(),
  url: z.string(),
});

const article = z.object({
  layout: z.string(),
  category: z.literal('article'),
  title: z.string().optional(),
  date: z.string().optional(),
  featured: z.boolean().optional(),
  lead: z.string().optional(),
  subtitle: z.string().optional(),
  header_image: z.string().optional(),
  external_url: z.string().optional(),
  tags: z.array(z.string()).optional(),
  syndication: z.array(syndication).optional(),
  redirect_from: z.array(z.string()).optional(),
});

const bookmark = z.object({
  layout: z.string(),
  category: z.literal('bookmark'),
  title: z.string(),
  date: z.string().optional(),
  link: z.string(),
});

const jam = z.object({
  layout: z.string(),
  category: z.literal('jam'),
  title: z.string(),
  date: z.string().optional(),
  youtube_embed_id: z.string(),
});

const photo = z.object({
  layout: z.string(),
  category: z.literal('photo'),
  date: z.string().optional(),
  featured: z.boolean().optional(),
  header_image: z.string().optional(),
});

const video = z.object({
  layout: z.string(),
  category: z.literal('video'),
  title: z.string(),
  date: z.string().optional(),
  youtube_embed_id: z.string(),
});

const posts = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/posts', generateId }),
  schema: z.discriminatedUnion('category', [article, bookmark, jam, photo, video]),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages', generateId }),
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    lead: z.string().optional(),
    header_image: z.string().optional(),
  }),
});

const etc = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/etc', generateId }),
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    lead: z.string().optional(),
    header_image: z.string().optional(),
    has_toc: z.boolean().optional(),
    redirect_from: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects', generateId }),
  schema: z.object({
    layout: z.string(),
    category: z.enum(['portfolio', 'oss', 'other']),
    title: z.string(),
    description: z.string().optional(),
    year: z.number(),
    header_image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    project_url: z.string().optional(),
    jumpToProject: z.boolean().optional(),
    redirect_from: z.array(z.string()).optional(),
  }),
});

export const collections = { posts, pages, etc, projects };
