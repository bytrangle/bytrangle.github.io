import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { mapSlugToPageProps, mapPageIdToContent } from "../../lib/notion"
import cache from '../../lib/cache'
import Layout from "../../components/Layout"

const databaseId = process.env.NOTION_DATABASE_ID

export default function PostPage({ recordMap, frontmatter }) {
  return (
    <Layout recordMap={recordMap} frontmatter={frontmatter} />
  )
}

// export default function Post({ pageContent: blocks, pageProps, recordMap }) {
//   // return <p>Test page slug {data}</p>
//   if (!blocks || !pageProps) {
//     return <div />
//   }
//   const { title } = pageProps.properties["Name"]
//   const titleText = title[0].plain_text
//   return (
//     <div>
//        <Head>
//          <title>{titleText}</title>
//          <link rel="icon" href="/favicon.ico"></link>
//        </Head>
//        <article className="container">
//          <h1 className="title">{titleText}</h1>
//          <section>
//            {blocks.map((block) => (
//             // <Fragment key={block.id}>{renderBlock(block)}</Fragment>
//             <NotionRenderer recordMap={recordMap} />
//            ))}
//          </section>
//        </article>
//     </div>
//   )
//   // Checking if this component receives the block data
//   // return <pre>{JSON.stringify(data, null, 2)}</pre>
// }

export const getStaticPaths = async () => {
  const slugToPageMap = await mapSlugToPageProps(databaseId)
  console.log({ slugToPageMap })
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
  console.log('Building slug: ', slug)
  let page = await cache.getContentByKey(slug, 'database.db')
  if (!page) {
    const slugToPageMap = await mapSlugToPageProps(databaseId)
  //   console.log({ slugToPageMap })
     page = slugToPageMap[slug]
  }
  if (!page) {
    return {
      notFound: true
    }
  }
  // console.log({ page })
  const pageId = page.id
  // console.log({ pageId })
  // Get a mapping of all the children blocks of a page via unofficial Notion API
  // so that I can feed it to NotionRenderer
  const recordMap = await mapPageIdToContent(pageId)
  // console.log({ recordMap })
  const frontmatter = (({ last_edited_time, properties }) => ({ last_edited_time, properties }))(recordMap?.raw?.page)
  // console.log({ frontmatter })
  return {
    props: {
      frontmatter,
      recordMap,
    },
    revalidate: 10
  }
}