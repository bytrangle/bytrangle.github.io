import * as React from 'react'
import { AppProps } from 'next/app'

import '../styles/globals.css'
import "../styles/notion.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
