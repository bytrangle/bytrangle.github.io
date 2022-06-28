import * as React from 'react'
import Head from 'next/head'

import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import * as types from 'lib/types'

const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  // console.log({ recordMap })
  if (!recordMap) {
    return <div>Nothing</div>
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
        // rootPageId={rootPageId}
      />
    </>
  )
}

export default NotionPage