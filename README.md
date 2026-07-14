# The Diary of a Lucid Dame

My personal portfolio — a monochrome, Diary-of-a-Wimpy-Kid-inspired diary theme.
Black ink on cream lined notebook paper, hand-drawn SVG doodles, and a strict
33px baseline rhythm so text sits on the ruled lines.

Built with [Astro](https://astro.build) and edited through
[Keystatic](https://keystatic.com). Every page ships as plain static HTML with
zero client-side JavaScript; the only React on the site is the admin UI at
`/keystatic`.

## Structure

- `src/pages/` — one `.astro` file per page (home, about, experience, projects,
  skills, theories, musings, journey, patent-law), plus `musings/[slug].astro`
  and `theories/[slug].astro` which generate pages for entries written natively.
- `src/layouts/BaseLayout.astro` — shared head, topbar, nav, and footer
  (per-page quote, socials, copyright).
- `src/components/` — title block with squiggly underline, and the doodle cast
  (Greg, Rowley, Manny, Sweetie).
- `src/content/` — all editable content as files:
  - `projects/*.yaml`, `experience/*.yaml`, `skills/*.yaml`
  - `musings/*.mdoc`, `theories/*.mdoc` — diary entries. An entry with an
    `externalUrl` (e.g. a Medium post) renders as a card linking out; an entry
    with a body gets its own page on this site.
- `keystatic.config.ts` — the admin's collections and fields.
- `public/` — `styles.css` and image assets, served as-is.

## Working on it

```sh
npm install
npm run dev       # site at localhost:4321, admin at localhost:4321/keystatic
npm run build     # static build + vercel output
```

In dev, Keystatic runs in **local mode**: edits in the admin write straight to
the files in `src/content/`. You can also just edit those files by hand — the
admin is optional, the files are the source of truth.

## Editing from the browser (deployed site)

In production, Keystatic uses **GitHub mode**: saves become commits to this
repo, and Vercel rebuilds automatically (live in about a minute). One-time
setup:

1. Deploy, then visit `https://<your-domain>/keystatic`.
2. Keystatic walks you through creating a GitHub App for the repo.
3. Add the env vars it gives you (`KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`) to the Vercel project and redeploy.

After that, writing a new musing from any browser is: `/keystatic` → Musings →
New entry → save.

## Design

Designed in [pencil.dev](https://pencil.dev) (`pencil-new.pen` is the working
draft). The one rule: don't copy me — see `/patent-law` on the live site.
