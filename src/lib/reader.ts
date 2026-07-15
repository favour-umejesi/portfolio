// Build-time reader for Keystatic singletons (home, about, journey, settings).
// Collections are read through Astro's own content layer; singletons don't fit
// that model, so they come straight from the Keystatic config schema instead.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function readSingleton<K extends keyof typeof reader.singletons>(
  name: K
) {
  const value = await reader.singletons[name].read();
  if (!value) {
    throw new Error(`Missing singleton content: src/content/pages/${String(name)}.yaml`);
  }
  return value;
}
