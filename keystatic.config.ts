import { config, fields, collection, singleton } from '@keystatic/core';

// Local mode while developing (edits files on disk directly); GitHub mode on
// the deployed site (saves become commits, Vercel rebuilds). GitHub mode needs
// a one-time GitHub App setup — see README.
export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'favour-umejesi/portfolio' },
  ui: {
    brand: { name: 'The Diary of a Lucid Dame' },
    navigation: {
      'Diary entries': ['musings'],
      'Research': ['research', 'researchPage'],
      'Portfolio': ['experience'],
      'Pages': ['home', 'about', 'musingsPage', 'journey', 'patentLaw'],
      'Site': ['settings'],
    },
  },
  singletons: {
    home: singleton({
      label: 'Home page',
      path: 'src/content/pages/home',
      format: { data: 'yaml' },
      schema: {
        byline: fields.text({ label: 'Byline', description: 'Under the big title' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        status: fields.text({
          label: 'Status line',
          description: 'e.g. "Currently: Software Engineering Intern @ ServiceNow."',
        }),
        photoCaption: fields.text({ label: 'Photo caption' }),
      },
    }),
    about: singleton({
      label: 'About page',
      path: 'src/content/pages/about',
      format: { data: 'yaml' },
      schema: {
        bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Bio paragraphs',
          description: 'Wrap a phrase in == to highlight it, or in ** to bold it, e.g. ==Grambling State University== or **mathematics**',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
        whatImUpTo: fields.array(fields.text({ label: 'Item' }), {
          label: "What I'm up to",
          description: 'The "→" arrow is added automatically',
          itemLabel: (props) => props.value,
        }),
        likes: fields.array(fields.text({ label: 'Chip' }), {
          label: 'Stuff I like',
          description: 'Shown as chips, three per row',
          itemLabel: (props) => props.value,
        }),
      },
    }),
    musingsPage: singleton({
      label: 'Musings page',
      path: 'src/content/pages/musings',
      format: { data: 'yaml' },
      schema: {
        intro: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Intro paragraphs',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
      },
    }),
    patentLaw: singleton({
      label: 'Patent law page',
      path: 'src/content/pages/patent-law',
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        signoff: fields.text({ label: 'Sign-off', description: 'e.g. "— the lucid dame, esq."' }),
        body: fields.markdoc({
          label: 'The law itself',
          options: {
            image: {
              directory: 'public/images/pages',
              publicPath: '/images/pages/',
            },
          },
        }),
      },
    }),
    journey: singleton({
      label: 'Journey page',
      path: 'src/content/pages/journey',
      format: { data: 'yaml' },
      schema: {
        awards: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Gold stars & distinctions', itemLabel: (props) => props.fields.name.value }
        ),
        timeline: fields.array(
          fields.object({
            date: fields.text({ label: 'Date', description: 'Free text, e.g. "OCT 2024"' }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'The timeline', itemLabel: (props) => `${props.fields.date.value} — ${props.fields.title.value}` }
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
          description: 'Shown one at a time, rotating. e.g. Student, Developer, Researcher',
          itemLabel: (props) => props.value,
        }),
        affiliation: fields.text({
          label: 'Affiliation',
          description: 'e.g. "Computer Science and Mathematics, Grambling State University"',
        }),
        headline: fields.text({
          label: 'Headline',
          multiline: true,
          description: 'One or two sentences under your name, academic voice',
        }),
        headshot: fields.image({
          label: 'Headshot (optional)',
          directory: 'public/images/research',
          publicPath: '/images/research/',
        }),
        cv: fields.file({
          label: 'CV (PDF)',
          description: 'Upload your CV here. The "Download CV" button only appears once a file or link is set.',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        cvUrl: fields.text({
          label: 'CV link (optional)',
          description: 'Use this instead of an upload if your CV lives elsewhere, e.g. a Google Drive link',
        }),
        bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Bio paragraphs',
          description: 'Wrap a phrase in == to highlight it, or in ** to bold it, e.g. ==Grambling State University== or **mathematics**',
          itemLabel: (props) => props.value.slice(0, 60) || 'paragraph',
        }),
        interests: fields.array(fields.text({ label: 'Interest' }), {
          label: 'Research interests',
          itemLabel: (props) => props.value,
        }),
        showWriting: fields.checkbox({
          label: 'Show a Writing section',
          description: 'Lists the musings you ticked "Show on research profile" at the bottom of the page',
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
            description: 'Shown in the footer of every page and on the homepage contact row',
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
          description: 'Drives the All / Research / Projects filter on the page',
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
        year: fields.text({ label: 'Year', description: 'Free text, e.g. "2025" or "Aug – Dec 2025"' }),
        context: fields.text({
          label: 'Context',
          description: 'Where it happened, e.g. "Ursa Space Systems" or "JP Morgan Data for Good Hackathon"',
        }),
        role: fields.text({ label: 'Role (optional)', description: 'e.g. "ML Engineering Intern", "Team lead"' }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          description: 'Landscape works best (about 16:10). A plot, a screenshot, a poster crop.',
          directory: 'public/images/research',
          publicPath: '/images/research/',
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          description: 'Two to four sentences: the question, what you did, what came out. Wrap a phrase in ** to bold it or == to highlight it.',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. "code", "poster", "report", "notes"' }),
            url: fields.text({ label: 'URL', description: 'https://... or a path on this site like /musings/some-entry' }),
          }),
          { label: 'Links', itemLabel: (props) => props.fields.label.value || 'link' }
        ),
      },
    }),
    experience: collection({
      label: 'Experience',
      slugField: 'role',
      path: 'src/content/experience/*',
      format: { data: 'yaml' },
      schema: {
        role: fields.slug({ name: { label: 'Role / title' } }),
        company: fields.text({
          label: 'Company',
          description: 'Shown under the role, e.g. "ServiceNow"',
        }),
        dates: fields.text({
          label: 'Dates',
          description: 'Free text, e.g. "June 2025 - September 2025"',
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers appear first (put the newest at 1)',
          defaultValue: 1,
        }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/assets',
          publicPath: '/assets/',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
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
          description: 'Lists this entry under "writings." on the research profile (the home page)',
          defaultValue: false,
        }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        readTime: fields.integer({ label: 'Read time (minutes)', defaultValue: 5 }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          description: 'Shown on the musings page card',
        }),
        externalUrl: fields.url({
          label: 'External URL (optional)',
          description:
            'If set (e.g. a Medium link), the card links out and no page is generated on this site',
        }),
        body: fields.markdoc({
          label: 'Body',
          description: 'Write here for entries published on this site; leave empty for external posts',
          options: {
            image: {
              directory: 'public/images/musings',
              publicPath: '/images/musings/',
            },
          },
        }),
      },
    }),
  },
});
