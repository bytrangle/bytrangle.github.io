import * as React from 'react'
import { isDev, domain } from '../lib/config'
import cache from 'lib/cache'
import parseSlug from 'lib/parse-slug-from-notion-url'
import getCanonicalPageMap from 'lib/get-canonical-page-map'
import { getBlockChildren } from 'lib/notion-helpers'
import NotionPage from '../components/NotionPage'

const rootNotionPageId = process.env.NOTION_DATABASE_ID

export const getStaticProps = async (context) => {
  let path = (context.params.pageId as string)
  if (isDev) {
    path = parseSlug(path)
  }
  console.log({ path })
  const pageProps = await cache.getContentByKey(path, 'blog-posts.json')
  console.log({ pageProps })
  let blocks = []
  if (pageProps['id']) {
    const { id } = pageProps
    blocks = await getBlockChildren(id)
  }
  return {
    props: {
      blocks
    },
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
  return {
    paths,
    fallback: true
  }
}

export default function NotionDynamicPage(props) {
  // return <NotionPage {...props} />
  return <p>Test</p>
}