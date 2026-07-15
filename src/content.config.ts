import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = z.object({
  title: z.string(),
  draft: z.boolean().default(false),
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

const theories = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/theories' }),
  schema: entrySchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(1),
    description: z.string(),
    tech: z.string(),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    dates: z.string(),
    order: z.number().default(1),
    logo: z.string().optional().nullable(),
    description: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/skills' }),
  schema: z.object({
    category: z.string(),
    order: z.number().default(1),
    items: z.array(z.string()).default([]),
  }),
});

// the patent-law essay is a Keystatic singleton, but Astro reads it as a
// one-entry collection so the markdoc body renders through the normal pipeline
const lawPage = defineCollection({
  loader: glob({ pattern: 'patent-law.mdoc', base: './src/content/pages' }),
  schema: z.object({ signoff: z.string().optional() }),
});

export const collections = { musings, theories, projects, experience, skills, lawPage };
