import { getCanonicalPageId } from 'notion-utils'
import { getReadyToPublishPosts } from "./notion-helpers"
import slugifyNotionUrl from './slugify-notion-url'
import getDatabasePageTitle from './get-database-page-title'
import cache from './cache'

export default async function getCanonicalPageMap() {
  const res = await getReadyToPublishPosts(process.env.NOTION_DATABASE_ID)
  const map = res.reduce((result, currentPage) => {
    if ("properties" in currentPage && "url" in currentPage) {
      const { id, url } = currentPage
      const title = getDatabasePageTitle(currentPage)
      const slug = title.toLowerCase().split(' ').join('-')
      const split = url.split('/')
      const notionSlug = split[split.length - 1].toLowerCase()
      if (slug && slug.length > 0) {
        result[slug] = {
          id,
          title,
          properties: currentPage.properties, 
          url, 
          slug: {
            dev: notionSlug,
            production: slug
          } 
        }
      }
    }
    return result
  }, {})
  console.log(map)
  const cachedDb = await cache.readFile('blog-posts.json')
  if (!cachedDb) {
    // Add newlines and a couple of indentations to the serialized JSON
    const data = JSON.stringify(map, null, 2)
    await cache.set(data, 'blog-posts.json')
  }
  return map
}