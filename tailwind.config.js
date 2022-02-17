const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{html,js,tsx,ts}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.gray.900"),
              fontWeight: "800",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
        xl: {
          css: {
            h1: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
      }),
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      display: [
        // "Inter var",,
        "Inter",
        "Noto Sans Thai",
        "SF Pro Display",
        "Sukhumvit Set",
        "Kanit",
        ...defaultTheme.fontFamily.sans,
      ],
      number: ["Roboto", "Inter", "SF Pro Display", "Sukhumvit Set", "Kanit", ...defaultTheme.fontFamily.sans],
      monospace: ["Fira Mono", "Roboto Mono", "Courier New", "SF Mono", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase }) {
      addBase({
        // "@font-face": {
        //   fontFamily: "Inter var",
        //   fontWeight: "100 900",
        //   fontStyle: "normal",
        //   fontNamedInstance: "Regular",
        //   fontDisplay: "swap",
        //   src: 'url("/fonts/Inter-roman.var.woff2?3.13") format("woff2")',
        // },
        // "@font-face": {
        //   fontFamily: "Inter var",
        //   fontWeight: "100 900",
        //   fontStyle: "italic",
        //   fontNamedInstance: "Italic",
        //   fontDisplay: "swap",
        //   src: 'url("/fonts/Inter-italic.var.woff2?3.13") format("woff2")',
        // },
        "@font-face": {
          fontFamily: "Kanit",
          fontStyle: "normal",
          fontWeight: "400",
          fontDisplay: "swap",
          src: 'local("Kanit Regular"), local("Kanit-Regular"), url(https://fonts.gstatic.com/s/kanit/v7/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2) format("woff2")',
          unicodeRange: "U+0E01-0E5B, U+200C-200D, U+25CC",
        },
        "@font-face": {
          fontFamily: "Sukhumvit Set",
          fontDisplay: "swap",
          src: "local('Sukhumvit Set')",
          unicodeRange: "U+0E01-0E5B, U+200C-200D, U+25CC",
        },
      })
    }),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
}
