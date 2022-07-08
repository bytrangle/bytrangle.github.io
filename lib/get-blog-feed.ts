import { officialNotionClient } from './notion-api'
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
  const blogFeed = await Promise.all(posts.map(async (page) => {
    const { id } = page
    const title = getDatabasePageTitle(page)
    const richText = page["properties"]["Description"]["rich_text"]
    console.log({ richText })
    let descriptionText = ""
    if (richText.length !== 0) {
      descriptionText = richText.map(elem => elem["plain_text"]).join("")
    } else {
      const response = await officialNotionClient.blocks.children.list({
        block_id: id,
        page_size: 1
      })
      const firstBlock = response.results[0]
      const firstBlockType = firstBlock["type"]
      const richTextArray = firstBlock[firstBlockType]["rich_text"].map(element => element["plain_text"])
      descriptionText = richTextArray.join("")
    }
    return { id, title, description: descriptionText }
  }))
  return blogFeed || []
}