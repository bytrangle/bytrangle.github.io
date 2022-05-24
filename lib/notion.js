import { Client } from "@notionhq/client"
import slugify from "slugify"

const notion = new Client({
  auth: process.env.NOTION_SECRET
})

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId
  })
  return response.results
}

export const getPageById = async (pageId) => {
  const response = await notion.pages.retrieve({
    page_id: pageId
  })
  return response
}

export const getDatabasePageMap = async (databaseId) => {
  const database = await notion.databases.query({
    database_id: databaseId
  })
  const titleToIdMap = database.results.reduce((map, page) => {
    const { id, properties } = page
    const title = properties["Name"]["title"][0]["plain_text"]
    const slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g
    })
    return {
      ...map,
      [slug]: id
    }
  }, {})
  return titleToIdMap
}

export const getPageIdFromSlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Name",
          title: {
            equals: "Circular Queue Implementation in Javascript"
          }
        }
      ]
    }
  })
  return response.results[0].id
}

export const getBlocks = async (pageId) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: pageId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}