import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import * as types from 'lib/types'
import mapPageUrl from 'lib/map-page-url'

const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()
  const siteMapPageUrl = React.useMemo(() => {
    return mapPageUrl(site, recordMap)
  }, [site, recordMap])
  if (router.isFallback) {
    return <p>Loading...</p>
  }
  const title = getPageTitle(recordMap)
  console.log({ title })

  return (
    <>
      <Head>
        <meta name='description' content='React Notion X minimal demo' />
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={false}
        mapPageUrl={siteMapPageUrl}
        // rootPageId={rootPageId}
      />
    </>
  )
}

export default NotionPage