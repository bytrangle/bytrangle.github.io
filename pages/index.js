import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import { PHASE_PRODUCTION_BUILD} from 'next/constants'
import { getDatabase, mapSlugToPageProps } from "../lib/notion"
import cache from "../lib/cache"
import styles from '../styles/Home.module.css'

const databaseId = process.env.NOTION_DATABASE_ID

const BlogFeed = ({ posts }) => {
  return (
    <div className={`${styles.main}`}>
      <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-slate-900 dark:text-slate-200">A Slow Developer&apos;s Handbook</h2>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <a className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200">{post.title}</a>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const slugToPageMap = await mapSlugToPageProps(databaseId)
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await cache.set(slugToPageMap, 'database.db')
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