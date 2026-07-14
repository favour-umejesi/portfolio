import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Every page prerenders to static HTML; the adapter only exists so the
// /keystatic admin routes can run as serverless functions on Vercel.
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  adapter: vercel(),
});
