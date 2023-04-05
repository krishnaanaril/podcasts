/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/podcasts-ui/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}

