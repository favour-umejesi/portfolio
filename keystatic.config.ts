import { config, fields, collection } from '@keystatic/core';

// Local mode while developing (edits files on disk directly); GitHub mode on
// the deployed site (saves become commits, Vercel rebuilds). GitHub mode needs
// a one-time GitHub App setup — see README.
export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'favour-umejesi/portfolio' },
  ui: {
    brand: { name: 'The Diary of a Lucid Dame' },
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
