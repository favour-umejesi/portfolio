# The Diary of a Lucid Dame
## The research page (`/`, the front door; the diary home lives at `/diary`)

The site's "serious" face for research applications. It uses its own layout,
`src/layouts/ResearchLayout.astro` (white, plain, no diary styles), and is
linked from the diary nav and the home "stuff to click on" panel. Everything
on it is editable from `/keystatic` under the **Research** group:

- **Research page** (singleton): name, titles, affiliation, headline, headshot, CV upload (or link),
  bio, research interests, education, coursework, honors, and a toggle for the
  Writing section (which auto-lists published theories and musings).
- **Research & works** (collection): one entry per card. `kind` drives the
  All / Research / Projects filter. Add a landscape thumbnail (about 16:10);
  without one the card shows a grey placeholder. `links` can point to code, a
  poster, a report, or a theories entry on this site (use a path like
  `/theories/some-entry`). Drafts behave like musings drafts: visible locally
  and on preview deploys, hidden in production.
