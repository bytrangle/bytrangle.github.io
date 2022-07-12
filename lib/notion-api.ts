import { NotionAPI } from 'notion-client'
import { Client } from '@notionhq/client'

const officialNotionClient = new Client({
  auth: process.env.NOTION_SECRET
})

export const unofficialNotionClient = new NotionAPI()

export default officialNotionClient
