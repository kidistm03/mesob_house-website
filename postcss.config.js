// postcss.config.js
// PostCSS is a tool that processes our CSS file and runs plugins on it.
// Tailwind itself is a PostCSS plugin, and autoprefixer adds vendor
// prefixes (like -webkit-) automatically so styles work across browsers.

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
