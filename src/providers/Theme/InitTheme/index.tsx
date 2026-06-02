// import Script from 'next/script'
// import React from 'react'

// import { defaultTheme, themeLocalStorageKey } from '../shared'

// export const InitTheme: React.FC = () => {
//   return (
//     // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
//     <Script
//       dangerouslySetInnerHTML={{
//         __html: `
//   (function () {
//     function getImplicitPreference() {
//       var mediaQuery = '(prefers-color-scheme: dark)'
//       var mql = window.matchMedia(mediaQuery)
//       var hasImplicitPreference = typeof mql.matches === 'boolean'

//       if (hasImplicitPreference) {
//         return mql.matches ? 'dark' : 'light'
//       }

//       return null
//     }

//     function themeIsValid(theme) {
//       return theme === 'light' || theme === 'dark'
//     }

//     var themeToSet = '${defaultTheme}'
//     var preference = window.localStorage.getItem('${themeLocalStorageKey}')

//     if (themeIsValid(preference)) {
//       themeToSet = preference
//     } else {
//       var implicitPreference = getImplicitPreference()

//       if (implicitPreference) {
//         themeToSet = implicitPreference
//       }
//     }

//     document.documentElement.setAttribute('data-theme', themeToSet)
//   })();
//   `,
//       }}
//       id="theme-script"
//       strategy="beforeInteractive"
//     />
//   )
// }

// hard code default theme to dark for now, as the theme switcher is not yet implemented
// providers/Theme/InitTheme.tsx
import Script from 'next/script'
import React from 'react'

export const InitTheme: React.FC = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            // Force dark theme regardless of storage or system settings
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
          })();
        `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
