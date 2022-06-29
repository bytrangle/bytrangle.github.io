import '../styles/globals.css'
import "../styles/notion.css"
import 'prismjs/themes/prism-coy.css'

import * as React from 'react'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
