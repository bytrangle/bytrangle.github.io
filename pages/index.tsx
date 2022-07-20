import * as React from 'react'
import Link from 'next/link'
import Hand from 'public/static/pointing-hand.svg'
import getBlogFeed from '../lib/get-blog-feed'
import Container from "../components/Container"
import HomepageStyles from "../styles/Home.module.css"
// import Head from 'next/head'
// import Link from "next/link"
// import Image from 'next/image'
// import { PHASE_PRODUCTION_BUILD} from 'next/constants'
// import { getDatabase, mapSlugToPageProps } from "../lib/notion"
// import cache from "../lib/cache"
// import styles from '../styles/Home.module.css'

// const databaseId = process.env.NOTION_DATABASE_ID

// const BlogFeed = ({ posts }) => {
//   return (
//     <div className={`${styles.main}`}>
//       <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-slate-900 dark:text-slate-200">A Slow Developer&apos;s Handbook</h2>
//       <div>
//         {posts.map((post) => (
//           <article key={post.id}>
//             <Link href={`/blog/${post.slug}`}>
//               <a className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200">{post.title}</a>
//             </Link>
//           </article>
//         ))}
//       </div>
//     </div>
//   )
// }
type Post = {
  id: string,
  title: string,
  description: string,
  readingTime: number,
  slug: string
}

type HomeProps = {
  posts: Post[]
}
export default function Home(props: HomeProps) {
  const { posts } = props
  // console.log(posts)
  return (
    <Container>
      <h2 className='text-4xl sm:text-5xl pt-6 mb-4 tracking-tight font-extrabold uppercase'>A developer&apos;s notebook</h2>
      <p className='mb-6'>Sharing what I&apos;learned as a developer, critical and trivial.</p>
      <div className='grid lg:grid-cols-12'>
      {posts.map((post, index) => (
        <div key={index} className={`story-card__wrapper lg:col-span-4 flex flex-col`}>
          {/* Don't add a right border if it is the last item of the list */}
          <div className={`story-card__inner lg:px-4 flex-auto dark:border-slate-600 ${index !== posts.length - 1 && 'lg:border-r'}`}>
            <Link href={`/${post.slug}`}>
              <a>
                <h3 className='text-2xl mb-3 font-bold'>{post.title}</h3>
                <p className={`relative ${HomepageStyles.standfirst}
                    after:bg-gradient-to-b after:dark:from-transparent after:dark:to-slate-900
                `}>
                  {post.description}
                </p>
                <div className='mt-3 flex justify-between'>
                  <Hand className={`dark:fill-slate-400 ${HomepageStyles.handIcon}`} />
                  <div className='flex flex-col items-center'>
                    <svg className={`${HomepageStyles.icon} dark:fill-slate-400`} x="0px" y="0px" viewBox="0 0 30.2 11.8"><path d="M22.7,10.1c-1.7,0-3.2-1-3.9-2.6c-0.6-1.6-0.3-3.4,0.9-4.6c1.2-1.2,3-1.6,4.6-0.9c1.6,0.7,2.6,2.2,2.6,3.9 C26.9,8.2,25,10.1,22.7,10.1 M7.6,10.1c-1.7,0-3.2-1-3.9-2.6C3,5.9,3.4,4.1,4.6,2.9c1.2-1.2,3-1.6,4.6-0.9c1.6,0.7,2.6,2.2,2.6,3.9 C11.8,8.2,9.9,10.1,7.6,10.1 M29.4,5h-0.9c-0.4-3-3-5.1-6-5c-3,0.1-5.4,2.4-5.7,5.4c-1,0.6-2.4,0.6-3.4,0c-0.2-3-2.7-5.3-5.7-5.4 c-3-0.1-5.6,2.1-6,5H0.8C0.4,5,0,5.4,0,5.9c0,0.5,0.4,0.8,0.8,0.8h0.9c0.4,2.8,2.7,4.9,5.6,5c2.8,0.1,5.3-1.8,6-4.6 c1.2,0.5,2.5,0.5,3.7,0c0.6,2.8,3.1,4.7,6,4.6c2.8-0.1,5.2-2.2,5.6-5h0.9c0.5,0,0.8-0.4,0.8-0.8C30.2,5.4,29.9,5,29.4,5"></path></svg>
                    <p className='text-sm'>{post.readingTime} mins</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className='story-card__separator lg:px-4'>
            <div className='separator--solid my-3 border-b dark:border-slate-600'></div>
          </div>
          {/* <div className={`story-card__inner lg:px-4 flex-auto dark:border-slate-600 ${index !== posts.length - 1 && 'lg:border-r'}`}>
              <h3 className='text-2xl mb-3 font-bold'>{post.title}</h3>
              <p className={`relative ${HomepageStyles.standfirst}
                after:bg-gradient-to-b after:dark:from-transparent after:dark:to-slate-900
              `}>{post.description}</p>
              <div className='mt-3 flex justify-between'>
                <Hand className={`dark:fill-slate-400 ${HomepageStyles.handIcon}`} />
                <div className='flex flex-col items-center'>
                  <svg className={`${HomepageStyles.icon} dark:fill-slate-400`} x="0px" y="0px" viewBox="0 0 30.2 11.8"><path d="M22.7,10.1c-1.7,0-3.2-1-3.9-2.6c-0.6-1.6-0.3-3.4,0.9-4.6c1.2-1.2,3-1.6,4.6-0.9c1.6,0.7,2.6,2.2,2.6,3.9 C26.9,8.2,25,10.1,22.7,10.1 M7.6,10.1c-1.7,0-3.2-1-3.9-2.6C3,5.9,3.4,4.1,4.6,2.9c1.2-1.2,3-1.6,4.6-0.9c1.6,0.7,2.6,2.2,2.6,3.9 C11.8,8.2,9.9,10.1,7.6,10.1 M29.4,5h-0.9c-0.4-3-3-5.1-6-5c-3,0.1-5.4,2.4-5.7,5.4c-1,0.6-2.4,0.6-3.4,0c-0.2-3-2.7-5.3-5.7-5.4 c-3-0.1-5.6,2.1-6,5H0.8C0.4,5,0,5.4,0,5.9c0,0.5,0.4,0.8,0.8,0.8h0.9c0.4,2.8,2.7,4.9,5.6,5c2.8,0.1,5.3-1.8,6-4.6 c1.2,0.5,2.5,0.5,3.7,0c0.6,2.8,3.1,4.7,6,4.6c2.8-0.1,5.2-2.2,5.6-5h0.9c0.5,0,0.8-0.4,0.8-0.8C30.2,5.4,29.9,5,29.4,5"></path></svg>
                  <p className='text-sm'>{post.readingTime} mins</p>
                </div>
              </div>
          </div>
          <div className='story-card__separator lg:px-4'>
            <div className='separator--solid my-3 border-b dark:border-slate-600'></div>
          </div> */}
        </div>
      ))}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const blogFeed = await getBlogFeed()
  // console.log(blogFeed)
//   const slugToPageMap = await mapSlugToPageProps(databaseId)
//   if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
//     await cache.set(slugToPageMap, 'database.db')
//   }
  return {
    props: {
      posts: blogFeed
    },
    revalidate: 10
  }

//   const posts = Object.keys(slugToPageMap).map((slug) => {
//     const pageProps = slugToPageMap[slug]
//     const { id, properties } = pageProps
//     const title = properties.Name.title[0].plain_text
//     const keywords = properties.Keywords.multi_select.map(keyword => keyword.name)
//     return { slug, id, title, keywords }
//   })
//   console.log(posts)
//   return {
//     props: {
//       posts
//     },
//     revalidate: 10
//   }
}

// export default BlogFeed