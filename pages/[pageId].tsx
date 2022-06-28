import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import notion from 'lib/notion-api'
import { isDev, domain } from '../lib/config'
import getCanonicalPageMap from 'lib/get-canonical-page-map'
import resolveNotionPage from 'lib/resolve-notion-page'
import NotionPage from '../components/NotionPage'

const rootNotionPageId = process.env.NOTION_DATABASE_ID

export const getStaticProps = async (context) => {
  const rawPageId = (context.params.pageId as string)
  console.log({ rawPageId })
  const recordMap = await notion.getPage(rawPageId)
  const props = await resolveNotionPage(domain, rawPageId)
  console.log({ props })
  return {
    props,
    revalidate: 10
  }
}
export async function getStaticPaths() {
  const canonicalPageMap= await getCanonicalPageMap()
  const staticPaths = {
    paths: Object.keys(canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    fallback: true
  }
  // console.log(staticPaths.paths)
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }
  return staticPaths
}

export default function NotionDynamicPage(props) {
  return <NotionPage {...props} />
}