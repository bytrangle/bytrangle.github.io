import notion, { officialNotionClient } from './notion-api'
import getDatabasePageTitle from './get-database-page-title'

export default async function getBlogFeed(count = 3) {
  const response = await officialNotionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Publish Status",
          select: {
            equals: 'ready'
          }
        },
        {
          property: "Keywords",
          multi_select: {
            "does_not_contain": "off-hours"
          }
        }
      ]
    }
  })
  const posts = response["results"].slice(0, count)
  const blogFeed = posts.map(page => {
    const title = getDatabasePageTitle(page)
    return {title}
  })
  return blogFeed || []
}