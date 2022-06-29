import { ExtendedRecordMap } from "notion-types"
import { parsePageId, getCanonicalPageId as getCanonicalPageIdImpl } from 'notion-utils'
import { Site } from "./types"
import { includeNotionIdInUrls } from './config'

// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = !!includeNotionIdInUrls

const getCanonicalPageId = (
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
) => {
  // Turn uuid to string without hyphens
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }
  const canonical = getCanonicalPageIdImpl(pageId, recordMap, { uuid })
  return canonical
}

const createUrl = (path: string) => {
  const url = [path].filter(Boolean).join('')
  return url
}

const mapPageUrl = 
  (site: Site, recordMap: ExtendedRecordMap) => 
  (pageId = '') => {
    // Make sure the the given page id ti in UUID format
    const pageUuid = parsePageId(pageId, { uuid: true })
    console.log({ pageUuid })
    return createUrl(
      `/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`
    )
}

export default mapPageUrl