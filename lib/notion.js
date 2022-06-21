import { Client } from "@notionhq/client"
import slugify from "slugify"
import { NotionCompatAPI } from 'notion-compat'

const notion = new Client({
  auth: process.env.NOTION_SECRET
})

const compatNotion = new NotionCompatAPI(notion)

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId
  })
  return response.results
}

// Fetch a page's content, including settings, block children
export const mapPageIdToContent = async (pageId) => {
  const recordMap = await compatNotion.getPage(pageId)
  return recordMap
}

export const getPageById = async (pageId) => {
  const response = await notion.pages.retrieve({
    page_id: pageId
  })
  return response
}

export const mapSlugToPageProps = async (databaseId) => {
  const database = await notion.databases.query({
    database_id: databaseId
  })
  const nameToPagePropsMap = database.results.reduce((map, page) => {
    const { properties } = page
    const title = properties["Name"]["title"][0]["plain_text"]
    const slug = slugify(title, {
      lower: true,
      remove: /[?*+~.()'"!:@]/g
    })
    return {
      ...map,
      [slug]: page
    }
  }, {})
  return nameToPagePropsMap
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