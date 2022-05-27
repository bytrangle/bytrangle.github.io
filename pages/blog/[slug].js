import { Fragment } from "react"
import Head from "next/head"
import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { getDatabase, getPageById, getBlocks, getDatabasePageMap } from "../../lib/notion"
import cache from '../../lib/cache'
import renderBlock from "../../components/Block"

const databaseId = process.env.NOTION_DATABASE_ID

export default function Post({ pageContent: blocks, pageProps }) {
  // return <p>Test page slug {data}</p>
  if (!blocks || !pageProps) {
    return <div />
  }
  const { title } = pageProps.properties["Name"]
  const titleText = title[0].plain_text
  return (
    <div>
       <Head>
         <title>{titleText}</title>
         <link rel="icon" href="/favicon.ico"></link>
       </Head>
       <article className="container">
         <h1 className="title">{titleText}</h1>
         <section>
           {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
           ))}
         </section>
       </article>
    </div>
  )
  // Checking if this component receives the block data
  // return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getStaticPaths = async () => {
  const slugToPageMap = await getDatabasePageMap(databaseId)
  // console.log({ slugToPageMap })
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    // console.log('Caching database')
    await cache.set(slugToPageMap, 'database.db')
  }
  return {
    paths: Object.keys(slugToPageMap).map((slug) => ({
      params: {
        slug
      }
    })),
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  // console.log('Building slug: ', slug)
  let page = await cache.getContentByKey(slug, 'database.db')
  // console.log({ page })
  if (!page) {
    const slugToPageMap = await getDatabasePageMap(databaseId)
  //   console.log({ slugToPageMap })
     page = slugToPageMap[slug]
  }
  if (!page) {
    return {
      notFound: true
    }
  }
  const pageId = page.id
  const pageProps = (( { properties, last_edited_time }) => ({ properties, last_edited_time}))(page)
  const pageContent = await getBlocks(pageId)
  // console.log({ pageId })
  // console.log(`Page has ${pageContent.length} blocks`)
  // console.log('----------')
  return {
    props: {
      pageProps,
      pageContent,
    }
  }
}