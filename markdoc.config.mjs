import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

// Custom blocks available in article bodies. The names and attributes mirror
// the `components` on the musings body field in keystatic.config.ts.
export default defineMarkdocConfig({
  nodes: {
    // every plain image gets the taped-photo frame too
    image: {
      render: component('./src/components/markdoc/TapedImage.astro'),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String },
      },
    },
  },
  tags: {
    // photos taped in side by side
    gallery: {
      render: component('./src/components/markdoc/Gallery.astro'),
    },
    photo: {
      render: component('./src/components/markdoc/Photo.astro'),
      selfClosing: true,
      attributes: {
        image: { type: String },
        caption: { type: String },
      },
    },
    // one photo with the writing wrapped around it
    sidePhoto: {
      render: component('./src/components/markdoc/SidePhoto.astro'),
      attributes: {
        image: { type: String },
        caption: { type: String },
        side: { type: String, default: 'right', matches: ['left', 'right'] },
      },
    },
  },
});
