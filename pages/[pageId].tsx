import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import { unofficialNotionClient as notion } from 'lib/notion-api'
import { isDev, domain } from '../lib/config'
import getCanonicalPageMap from 'lib/get-canonical-page-map'
import resolveNotionPage from 'lib/resolve-notion-page'
import NotionPage from '../components/NotionPage'

const rootNotionPageId = process.env.NOTION_DATABASE_ID

export const getStaticProps = async (context) => {
  console.log({ context })
  const slug = (context.params.pageId as string)
  // console.log({ slug })
  // const recordMap = await notion.getPage(rawPageId)
  // const props = await resolveNotionPage(domain, rawPageId)
  // console.log({ props })
  return {
    props: {},
    revalidate: 10
  }
}
export async function getStaticPaths() {
  const canonicalPageMap= await getCanonicalPageMap()
  const paths = Object.keys(canonicalPageMap).map((slug) => {
    let path = slug
    if (isDev) {
      path = canonicalPageMap[slug]["slug"]["dev"]
      console.log({ path })
    }
    return {
      params: {
        pageId: path
      }
    }
  })
  // console.log(paths)
  // const staticPaths = {
  //   paths: Object.keys(canonicalPageMap).map((pageId) => ({
  //     params: {
  //       pageId: canonicalPageMap[pageId]["notion_slug"]
  //     }
  //   })),
  //   fallback: true
  // }
  // console.log(staticPaths.paths)
  // if (isDev) {
  //   return {
  //     paths: [],
  //     fallback: true
  //   }
  // }
  return {
    paths,
    fallback: true
  }
}

export default function NotionDynamicPage(props) {
  // return <NotionPage {...props} />
  return <p>Test</p>
}