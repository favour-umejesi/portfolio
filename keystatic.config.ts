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
      'Diary entries': ['musings', 'theories'],
      'Portfolio': ['projects', 'experience', 'skills'],
      'Pages': ['home', 'about', 'journey'],
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
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers appear first on the page',
          defaultValue: 1,
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        tech: fields.text({
          label: 'Tech stack',
          description: 'One line, separated with " · " — e.g. Python · Pandas · NumPy',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              description: 'e.g. "github ↗", "live ↗", "colab ↗"',
            }),
            url: fields.url({ label: 'URL' }),
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
    skills: collection({
      label: 'Skill categories',
      slugField: 'category',
      path: 'src/content/skills/*',
      format: { data: 'yaml' },
      schema: {
        category: fields.slug({ name: { label: 'Category' } }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        items: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Skills',
          itemLabel: (props) => props.value,
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
        }),
      },
    }),
    theories: collection({
      label: 'Theories',
      slugField: 'title',
      path: 'src/content/theories/*',
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site until you untick this',
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
          description: 'Shown on the theories page card',
        }),
        externalUrl: fields.url({
          label: 'External URL (optional)',
          description:
            'If set, the card links out and no page is generated on this site',
        }),
        body: fields.markdoc({
          label: 'Body',
          description: 'Write here for entries published on this site; leave empty for external posts',
        }),
      },
    }),
  },
});
