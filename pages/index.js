import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import { PHASE_PRODUCTION_BUILD} from 'next/constants'
import { getDatabase, getDatabasePageMap } from "../lib/notion"
import cache from "../lib/cache"
import styles from '../styles/Home.module.css'

const databaseId = process.env.NOTION_DATABASE_ID

const BlogFeed = ({ posts }) => {
  // return <p>Goal: reduce API calls to Notion</p>
  // console.log(posts)
  return (
    <div className={styles.main}>
      <h2>A Slow Developer&apos;s Handbook</h2>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const getStaticProps = async () => {
  let slugToPageMap = await cache.getWholeFileContent('database.db')
  if (!slugToPageMap) {
    slugToPageMap = await getDatabasePageMap(databaseId)
    console.log({ slugToPageMap })
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      await cache.set(slugToPageMap, 'database.db')
    }
  }

  const posts = Object.keys(slugToPageMap).map((slug) => {
    const pageProps = slugToPageMap[slug]
    const { id, properties } = pageProps
    const title = properties.Name.title[0].plain_text
    const keywords = properties.Keywords.multi_select.map(keyword => keyword.name)
    return { slug, id, title, keywords }
  })
  console.log(posts)
  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

export default BlogFeed