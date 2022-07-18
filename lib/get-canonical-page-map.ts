import { getReadyToPublishPosts } from "./notion-helpers"
import slugifyNotionUrl from './parse-slug-from-notion-url'
import getDatabasePageTitle from './get-database-page-title'
import cache from './cache'

export default async function getCanonicalPageMap() {
  const res = await getReadyToPublishPosts(process.env.NOTION_DATABASE_ID)
  const map = res.reduce((result, currentPage) => {
    if ("properties" in currentPage && "url" in currentPage) {
      const { id, url, last_edited_time } = currentPage
      const title = getDatabasePageTitle(currentPage)
      const split = url.split('/')
      const notionSlug = split[split.length - 1].toLowerCase()
      const slug = slugifyNotionUrl(url)
      if (slug && slug.length > 0) {
        result[slug] = {
          id,
          last_edited_time,
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
  // console.log(map)
  const cachedDb = await cache.readFile('blog-posts.json')
  if (!cachedDb) {
    // Add newlines and a couple of indentations to the serialized JSON
    const data = JSON.stringify(map, null, 2)
    await cache.set(data, 'blog-posts.json')
  } else {
    const newMap = Object.keys(map).reduce((previousMap, currentSlug) => {
      if (!cache[currentSlug] || (cache[currentSlug] && cache[currentSlug]['last_edited_time'] !== map[currentSlug]['last_edited_time'])) {
        return {
          ...previousMap,
          [currentSlug]: map[currentSlug]
        }
      }
      return previousMap
    }, {})
    console.log({ newMap })
    if (Object.keys(newMap).length > 0) {
      const newData = JSON.stringify(newMap, null, 2)
      await cache.set(newData, 'blog-posts.json')
    }
  }
  return map
}