import { NotionAPI } from 'notion-client'
import { Client } from '@notionhq/client'

const notion = new NotionAPI()

export const officialNotionClient = new Client({
  auth: process.env.NOTION_SECRET
})

export default notion
