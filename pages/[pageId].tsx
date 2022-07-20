import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { isDev, domain } from '../lib/config'
import cache from 'lib/cache'
import parseSlug from 'lib/parse-slug-from-notion-url'
import getCanonicalPageMap from 'lib/get-canonical-page-map'
import { getBlockChildren } from 'lib/notion-helpers'
import NotionPage from '../components/NotionPage'

type Slug = {
  dev: string,
  production: string
}

type PageProps = {
  id: string,
  last_edited_time: string,
  title: string,
  url: string,
  properties: any,
  slug: Slug
}

export const getStaticProps = async (context) => {
  const path = (context.params.pageId as string)
  const pageProps: PageProps = await cache.getContentByKey(path, 'blog-posts.json')
  // console.log({ pageProps })
  let blockChildren = []
  if (pageProps['id']) {
    const { id } = pageProps
    blockChildren = await getBlockChildren(id)
  }
  return {
    props: {
      blockChildren,
      pageProps
    },
    revalidate: 10
  }
}
export async function getStaticPaths() {
  const canonicalPageMap= await getCanonicalPageMap()
  const paths = Object.keys(canonicalPageMap).map((slug) => {
    return {
      params: {
        pageId: slug
      }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export default function NotionDynamicPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('👼 Block children')
  console.log(props)
  return <NotionPage {...props} />
  // return <p>Test</p>
}