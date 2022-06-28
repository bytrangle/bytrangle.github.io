import { parsePageId } from 'notion-utils'
import { ExtendedRecordMap } from 'notion-types'
import handlePageError from './handle-page-error'
import { site } from './config'
import notion from './notion-api'

// This function should return an object with three properties:
// - site: site-wide configurations like domain, site name and description
// - recordMap: data structure for the Notion page
// - pageID: needed for creating pretty url for the page and helpful for debugging

export default async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string
  let recordMap: ExtendedRecordMap
  if (rawPageId) {
    pageId = parsePageId(rawPageId)
    if (pageId) {
      recordMap = await notion.getPage(pageId)
    }
  }
  const props = { site, recordMap, pageId }
  return { ...props, ...(await handlePageError(props)) }
}