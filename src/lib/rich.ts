// Plain-text fields (bios, lists) allow two shortcuts the way the editor's
// toolbar does for entries: ==phrase== is a highlight, **phrase** is bold.
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const rich = (t: string) =>
  esc(t)
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
