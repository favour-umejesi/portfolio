import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = z.object({
  title: z.string(),
  draft: z.boolean().default(false),
  research: z.boolean().default(false),
  series: z.string().optional().nullable(),
  date: z.coerce.date(),
  readTime: z.number().optional().nullable(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional().nullable(),
  externalUrl: z.string().optional().nullable(),
});

const musings = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/musings' }),
  schema: entrySchema,
});

// playlists: a series of musings, picked per entry via the `series` field
const series = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['research', 'project']).default('project'),
    draft: z.boolean().default(false),
    order: z.number().default(1),
    year: z.string().optional().nullable(),
    context: z.string().optional().nullable(),
    role: z.string().optional().nullable(),
    thumbnail: z.string().optional().nullable(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string().default(''), url: z.string().nullable().default('') }))
      .default([]),
  }),
});

// the patent-law essay is a Keystatic singleton, but Astro reads it as a
// one-entry collection so the markdoc body renders through the normal pipeline
const lawPage = defineCollection({
  loader: glob({ pattern: 'patent-law.mdoc', base: './src/content/pages' }),
  schema: z.object({ signoff: z.string().optional() }),
});

export const collections = { musings, series, research, lawPage };
