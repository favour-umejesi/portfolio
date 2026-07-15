// Helpers for musings/theories entries.

// Draft entries render in local dev and on Vercel preview deployments, never
// on the production site. (VERCEL_ENV is set by Vercel at build time.)
export const showDrafts =
  import.meta.env.DEV || process.env.VERCEL_ENV === 'preview';

// "JUN 30, 2025 · 5 MIN READ · MEDIUM" — matches the hand-written meta line
// the musings page shipped with.
export function entryMeta(
  date: Date,
  readTime?: number | null,
  externalUrl?: string | null
): string {
  const formatted = date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
  const parts = [formatted];
  if (readTime) parts.push(`${readTime} MIN READ`);
  if (externalUrl) parts.push(sourceLabel(externalUrl));
  return parts.join(' · ');
}

export function sourceLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'medium.com') return 'MEDIUM';
    return host.split('.')[0].toUpperCase();
  } catch {
    return 'ELSEWHERE';
  }
}

// Pretty-cased variant for link text: "→ read it on Medium"
export function sourceName(url: string): string {
  const label = sourceLabel(url);
  return label.charAt(0) + label.slice(1).toLowerCase();
}

// Generates a squiggly title underline in the same hand-drawn style as the
// fixed pages (repeating 48px humps), sized roughly to the title length.
export function underline(title: string): { width: number; path: string } {
  const width = Math.min(620, Math.max(180, Math.round(title.length * 21)));
  const pairs = Math.max(3, Math.round((width - 50) / 48));
  const path =
    'M2 7q24-6 48 0t' + Array.from({ length: pairs }, () => '48 0').join(' ');
  return { width, path };
}
