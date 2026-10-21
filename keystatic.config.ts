import { config, fields, collection, singleton } from '@keystatic/core';
import { block, mark, repeating, wrapper } from '@keystatic/core/content-components';
import { createElement } from 'react';

// Photo blocks for article bodies (the "+" menu in the editor). Rendered by the
// matching tags in markdoc.config.mjs.
const articlePhoto = () =>
  fields.image({
    label: 'Photo',
    directory: 'public/images/musings',
    publicPath: '/images/musings/',
    validation: { isRequired: true },
  });
const articleCaption = () =>
  fields.text({ label: 'Caption (optional)', description: 'Handwritten under the photo; also used as alt text' });

// one-line summary shown on the block inside the editor
const photoSummary = (value: { image: { filename: string } | null; caption: string }, extra: string = '') =>
  createElement(
    'span',
    { style: { opacity: 0.7, fontSize: 13 } },
    [value.image?.filename ?? 'no photo yet — press Edit', value.caption, extra].filter(Boolean).join(' · ')
  );

// a highlighter pen for the toolbar: {% highlight %}phrase{% /highlight %} in the
// file, a yellow marker stroke on the page (same as ==phrase== on the profile)
const highlighterIcon = createElement(
  'svg',
  { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
  createElement('path', { d: 'm9 11-6 6v3h9l3-3' }),
  createElement('path', { d: 'm22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4' })
);

const articleComponents = {
  highlight: mark({
    label: 'Highlight',
    icon: highlighterIcon,
    schema: {},
    tag: 'mark',
    style: { backgroundColor: '#ffe978', color: 'inherit' },
  }),
  gallery: repeating({
    label: 'Photo row',
    description: 'Photos taped in beside this part of the writing: down the right margin on a wide screen, stacked on a phone. Each photo has a Size.',
    children: 'photo',
    validation: { children: { min: 1, max: 4 } },
    schema: {},
  }),
  photo: block({
    label: 'Photo',
    forSpecificLocations: true,
    schema: {
      image: articlePhoto(),
      caption: articleCaption(),
      size: fields.select({
        label: 'Size',
        description: 'How wide the print is on the page',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
        defaultValue: 'medium',
      }),
    },
    ContentView: ({ value }) => photoSummary(value, value.size),
  }),
  sidePhoto: wrapper({
    label: 'Photo beside text',
    description: 'One photo taped into the margin beside this paragraph',
    schema: {
      image: articlePhoto(),
      caption: articleCaption(),
      side: fields.select({
        label: 'Photo goes on the',
        options: [
          { label: 'Right', value: 'right' },
          { label: 'Left', value: 'left' },
        ],
        defaultValue: 'right',
      }),
    },
    ContentView: ({ value, children }) =>
      createElement('div', null, photoSummary(value, `on the ${value.side}`), children),
  }),
};

// Local mode while developing (edits files on disk directly); GitHub mode on
// the deployed site (saves become commits, Vercel rebuilds). GitHub mode needs
// a one-time GitHub App setup — see README.
export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'favour-umejesi/portfolio' },
  ui: {
    brand: { name: 'Favour Umejesi' },
    navigation: {
      'Research': ['research', 'papers', 'news', 'researchPage'],
      'Musings': ['musings', 'series', 'musingsPage', 'drawingsPage'],
      'Site': ['settings'],
    },
  },
  singletons: {
    musingsPage: singleton({
      label: 'Musings page',
      path: 'src/content/pages/musings',
      format: { data: 'yaml' },
      schema: {
        intro: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Intro paragraphs',
          description: 'Shown under the "musings." heading. Keep it short; the list is the point.',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
      },
    }),
    drawingsPage: singleton({
      label: 'Drawings page',
      path: 'src/content/pages/drawings',
      format: { data: 'yaml' },
      schema: {
        intro: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Intro paragraphs',
          description: 'Shown under the "drawings." heading',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
        drawings: fields.array(
          fields.object({
            image: fields.image({
              label: 'Drawing',
              directory: 'public/images/drawings',
              publicPath: '/images/drawings/',
            }),
            caption: fields.text({ label: 'Caption', description: 'Written under the print; also used as alt text' }),
            when: fields.text({ label: 'When (optional)', description: 'e.g. "Oct 2026"; shown after the caption' }),
            glow: fields.text({
              label: 'Candle glow (optional)',
              description: 'Dims the picture towards its edges and pools warm light at this spot, written as left% top%, e.g. "63% 63%". Leave empty for no glow.',
            }),
          }),
          {
            label: 'Drawings',
            description: 'Taped to the wall in this order. Newest first reads best.',
            itemLabel: (props) => props.fields.caption.value || 'drawing',
          }
        ),
      },
    }),
    researchPage: singleton({
      label: 'Research page',
      path: 'src/content/pages/research',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Name' }),
        roles: fields.array(fields.text({ label: 'Word' }), {
          label: 'Titles under your name',
          description: 'Shown one at a time, rotating, in gold small caps under your name. e.g. Student, Developer, Researcher',
          itemLabel: (props) => props.value,
        }),
        affiliation: fields.text({
          label: 'Affiliation',
          description: 'Shown under the role, and used in the page description for search engines. e.g. "Computer Science and Mathematics, Grambling State University"',
        }),
        headline: fields.text({
          label: 'Headline',
          multiline: true,
          description: 'Optional opening line at the top of "about me.", before the bio paragraphs',
        }),
        headshot: fields.image({
          label: 'Photo (optional)',
          description: 'Shown upright at 220×264 with square corners at the top of the left column; an upright or square photo crops best.',
          directory: 'public/images/research',
          publicPath: '/images/research/',
        }),
        cv: fields.file({
          label: 'CV (PDF)',
          description: 'Upload your CV here. The "Download CV" link under the icons only appears once a file or link is set.',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        cvUrl: fields.text({
          label: 'CV link (optional)',
          description: 'Use this instead of an upload if your CV lives elsewhere, e.g. a Google Drive link',
        }),
        bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Bio paragraphs',
          description: 'Wrap a phrase in == to highlight it, in ** to bold it, or in * for italics, e.g. ==Grambling State University==, **mathematics**, *Whisper of the Heart*. :guitar: drops in a small guitar icon.',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
        interests: fields.array(fields.text({ label: 'Interest' }), {
          label: 'Research interests',
          description: 'The list under the "research interests." heading',
          itemLabel: (props) => props.value,
        }),
        papersNote: fields.text({
          label: 'Papers: placeholder line',
          description: 'Shown in italics under "papers." only while the Papers collection is empty. Leave empty to hide the section until then.',
        }),
        experience: fields.array(
          fields.object({
            role: fields.text({ label: 'Role', description: 'e.g. "Machine Learning Engineering Intern"' }),
            org: fields.text({ label: 'Where', description: 'e.g. "Ursa Space Systems"' }),
            when: fields.text({ label: 'When', description: 'e.g. "Aug – Dec 2025"' }),
          }),
          {
            label: 'Experience',
            description: 'Listed in the order you put them here; newest first reads best',
            itemLabel: (props) =>
              [props.fields.role.value, props.fields.org.value].filter(Boolean).join(' · ') || 'role',
          }
        ),
        honors: fields.array(
          fields.object({
            title: fields.text({ label: 'Honor', description: 'e.g. "Break Through Tech AI Fellow"' }),
            detail: fields.text({ label: 'Detail (optional)', description: 'e.g. "1 out of 30 selected engineering fellows"' }),
            when: fields.text({ label: 'When (optional)', description: 'e.g. "May 2025 – May 2026"' }),
          }),
          {
            label: 'Honors',
            description: 'Listed right after Experience, in the same style',
            itemLabel: (props) => props.fields.title.value || 'honor',
          }
        ),
        showWriting: fields.checkbox({
          label: 'Show a Writing section',
          description: 'Lists the musings you ticked "Show on research profile" under "writing." (scrolls once there are more than five)',
          defaultValue: true,
        }),
      },
    }),
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/pages/settings',
      format: { data: 'yaml' },
      schema: {
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. "github"' }),
            url: fields.text({
              label: 'URL',
              description: 'https://... or mailto:you@example.com',
            }),
          }),
          {
            label: 'Social links',
            description: 'Shown on the profile card and in the musings footer',
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        copyright: fields.text({ label: 'Copyright line' }),
      },
    }),
  },
  collections: {
    research: collection({
      label: 'Research & works',
      slugField: 'title',
      path: 'src/content/research/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        kind: fields.select({
          label: 'Kind',
          description: 'Research shows as a full row under "research." with its status; Project goes in the "selected projects." box with a details popup',
          options: [
            { label: 'Research', value: 'research' },
            { label: 'Project', value: 'project' },
          ],
          defaultValue: 'project',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site until you untick this',
          defaultValue: false,
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers appear first',
          defaultValue: 1,
        }),
        year: fields.text({ label: 'Year', description: 'Free text, e.g. "2025" or "Aug – Dec 2025". A research year ending in "present" counts as ongoing.' }),
        context: fields.text({
          label: 'Context',
          description: 'Where it happened, e.g. "Ursa Space Systems" or "JP Morgan Data for Good Hackathon"',
        }),
        role: fields.text({ label: 'Role (optional)', description: 'e.g. "ML Engineering Intern", "Team lead"' }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          description: 'Research: shown beside the row at its own proportions (a plot or figure reads best). Project: shown at the top of the details popup.',
          directory: 'public/images/research',
          publicPath: '/images/research/',
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          description: 'Project: three lines show in the box and the full text in the popup. Research: only a fallback for the Excerpt (its first sentence), so keep the long version here if you like but write the Excerpt. Wrap a phrase in ** or == for emphasis.',
        }),
        excerpt: fields.text({
          label: 'Excerpt (optional)',
          description: 'Research only: the two or three sentences shown on the row. Write it to stand alone; the sections below wait under "more". Left empty, the first sentence of the summary is used.',
        }),
        question: fields.text({
          label: 'Question or problem',
          multiline: true,
          description: 'Optional, one or two sentences. Research: the question you are investigating, shown under "more" as "Research question". Project: the problem it set out to solve, shown in the popup as "The problem".',
        }),
        contribution: fields.text({
          label: 'My contribution',
          multiline: true,
          description: 'Optional, one or two sentences. Your own part, especially in team work. Shown under "more" as "My contribution" for research, in the popup as "What I did" for a project.',
        }),
        findings: fields.text({
          label: 'Findings or outcome',
          multiline: true,
          description: 'Optional, one or two sentences. Research: results, limitations, open questions (label preliminary findings clearly), shown under "more" as "Findings". Project: what came of it, e.g. placement, recognition, users, shown in the popup as "Outcome".',
        }),
        status: fields.text({
          label: 'Status',
          description: 'Research only. "Ongoing" marks the row with a gold dot and lists it first; anything else, or empty, reads as Completed.',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          description: 'Shown under "more" on a research row, and in the popup for a project',
          itemLabel: (props) => props.value,
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. "code", "poster", "report", "notes"' }),
            url: fields.text({ label: 'URL', description: 'https://... or a path on this site like /musings/some-entry' }),
          }),
          {
            label: 'Links',
            description: 'Shown under "more" on a research row, and at the bottom of a project popup. Labels print in lowercase.',
            itemLabel: (props) => props.fields.label.value || 'link',
          }
        ),
      },
    }),
    papers: collection({
      label: 'Papers',
      slugField: 'title',
      path: 'src/content/papers/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title', description: 'The paper\'s title as it appears on the paper' } }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site until you untick this',
          defaultValue: false,
        }),
        authors: fields.array(
          fields.object({
            name: fields.text({ label: 'Name', description: 'Write your own name exactly as it is on the Research page; it is shown in bold' }),
            url: fields.text({ label: 'Link (optional)', description: 'A co-author\'s homepage or Scholar page' }),
          }),
          {
            label: 'Authors',
            description: 'In the order they appear on the paper. Add an asterisk to a name for equal contribution, e.g. "Jane Doe*"',
            itemLabel: (props) => props.fields.name.value || 'author',
          }
        ),
        venue: fields.text({
          label: 'Venue',
          description: 'Where it appeared or is headed, e.g. "NeurIPS 2027", "ICLR 2027 Workshop on Mechanistic Interpretability", "arXiv"',
        }),
        date: fields.date({
          label: 'Date',
          description: 'Orders the list, newest first; the year is shown next to the venue',
          validation: { isRequired: true },
        }),
        status: fields.select({
          label: 'Status',
          description: 'Anything other than Published is shown as a small label next to the venue',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Preprint', value: 'preprint' },
            { label: 'Under review', value: 'under-review' },
            { label: 'In preparation', value: 'in-preparation' },
          ],
          defaultValue: 'published',
        }),
        summary: fields.text({
          label: 'One-line summary',
          multiline: true,
          description: 'One or two plain sentences on what the paper shows, under the venue line. Wrap a phrase in ** or == for emphasis.',
        }),
        thumbnail: fields.image({
          label: 'Figure (optional)',
          description: 'A teaser figure, shown beside the entry at its own proportions',
          directory: 'public/images/papers',
          publicPath: '/images/papers/',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. "pdf", "arXiv", "code", "project page", "poster", "slides"' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Links',
            description: 'Shown as a row of small text links under the summary',
            itemLabel: (props) => props.fields.label.value || 'link',
          }
        ),
        bibtex: fields.text({
          label: 'BibTeX (optional)',
          multiline: true,
          description: 'Paste the citation; readers get a small "bibtex" toggle that reveals it',
        }),
      },
    }),
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: {
            label: 'The line',
            description: 'One sentence, e.g. "Started as an ML Engineering Intern at Ursa Space Systems."',
          },
        }),
        date: fields.date({
          label: 'Date',
          description: 'Orders the list, newest first. Shown as month and year.',
          validation: { isRequired: true },
        }),
        when: fields.text({
          label: 'Shown date (optional)',
          description: 'Replaces the month and year, e.g. "Spring 2026" or just "2025"',
        }),
        url: fields.text({
          label: 'Link (optional)',
          description: 'https://... or a path on this site like /musings/some-entry',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site until you untick this',
          defaultValue: false,
        }),
      },
    }),
    musings: collection({
      label: 'Musings',
      slugField: 'title',
      path: 'src/content/musings/*',
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site until you untick this',
          defaultValue: false,
        }),
        research: fields.checkbox({
          label: 'Show on research profile',
          description: 'Lists this entry under "writing." on the research profile',
          defaultValue: false,
        }),
        series: fields.relationship({
          label: 'Playlist (optional)',
          description:
            'Files this entry into a playlist: it shows on the playlist page instead of as its own row on the musings page. Parts are numbered by date, oldest first.',
          collection: 'series',
        }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        readTime: fields.integer({ label: 'Read time (minutes)', description: 'Shown in the meta line, e.g. "5 MIN READ"', defaultValue: 5 }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          description: 'Shown under the title on the entry page, not in the list',
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          description: 'Shown under the title in the musings list, cut to one line. Also the page description for search engines.',
        }),
        externalUrl: fields.url({
          label: 'External URL (optional)',
          description:
            'If set (e.g. a Medium link), the card links out and no page is generated on this site',
        }),
        moodPhotos: fields.array(
          fields.object({
            image: fields.image({
              label: 'Photo',
              directory: 'public/images/musings',
              publicPath: '/images/musings/',
            }),
            caption: fields.text({
              label: 'Front: one short line',
              description: 'e.g. the title and artist. Written under the photo; also used as alt text',
            }),
            note: fields.text({
              label: 'Back: the longer note (optional)',
              multiline: true,
              description: 'Shown when a reader clicks the photo and it flips over, like writing on the back of a print',
            }),
          }),
          {
            label: 'Mood photos',
            description:
              'Small photos pinned at the end of the entry, after the writing: the ones that set the mood for the whole piece. For a photo that belongs to one paragraph, use the + menu inside the body instead.',
            itemLabel: (props) => props.fields.caption.value || 'photo',
          }
        ),
        moodNote: fields.text({
          label: 'Line above the mood photos (optional)',
          description: 'e.g. "pictures: things I was looking at while writing this"',
        }),
        body: fields.markdoc({
          label: 'Body',
          description: 'Write here for entries published on this site; leave empty for external posts',
          components: articleComponents,
          options: {
            image: {
              directory: 'public/images/musings',
              publicPath: '/images/musings/',
            },
          },
        }),
      },
    }),
    series: collection({
      label: 'Playlists',
      slugField: 'title',
      path: 'src/content/series/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title', description: 'e.g. "My learnings on deep learning"' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'A line or two shown on the playlist row (one line) and its page. A playlist only appears once it has a published entry.',
        }),
      },
    }),
  },
});
