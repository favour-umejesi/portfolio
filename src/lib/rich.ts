// Plain-text fields (bios, lists) allow three shortcuts the way the editor's
// toolbar does for entries: ==phrase== is a highlight, **phrase** is bold,
// *phrase* is italic (titles of films and books, mostly). :guitar: drops in a
// small line icon; see the `icons` map below for the ones that exist.
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Little inline line icons, written as :name: in the text. Drawn to sit in
// a line of running text at the size of a capital letter.
const icons: Record<string, string> = {
  guitar:
    '<path d="m11.9 12.1 4.514-4.514"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"/><path d="m6 16 2 2"/><path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"/><circle cx="12" cy="12" r="2"/>',
};
const icon = (name: string) =>
  icons[name]
    ? `<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`
    : `:${name}:`;

export const rich = (t: string) =>
  esc(t)
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/:([a-z]+):/g, (_, name) => icon(name));
