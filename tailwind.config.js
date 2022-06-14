/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            ul: {
              listStyleType: 'none',
              paddingLeft: 0
            },
            li: {
              position: "relative",
                // top: "calc(0.875em - 0.0625em)",
                // left: 0,
                // borderRadius: "999px",
              '&:before': {
                content: "\"\"",
                width: "0.75em",
                height: "0.125em",
                position: "absolute",
                backgroundColor: "#cbd5e1"  
              }
            },
            // 'li::before': {
            //   backgroundColor: "#cbd5e1"
            // }
              // '&:before': {
              //   content: "",
              //   width: "0.75em",
              //   height: "0.125em",
              //   position: "absolute",
              //   top: "calc(.875em - .0625em)",
              //   left: 0,
              //   "border-radius": "999px",
              //   "background-color": "#cbd5e1"
              // }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
