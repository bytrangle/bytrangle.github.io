import { PageProps } from './types'

export default async function handlePageError({
  site,
  recordMap,
  pageId
}: PageProps): Promise<PageProps> {
  if (!site) {
    return {
      error: {
        statusCode: 404,
        message: 'Unable to resolve Notion site'
      }
    }
  }
  if (!recordMap) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" not found.`
      }
    }
  }
  const keys = Object.keys(recordMap.block)
  const parentId = keys[0]
  if (!parentId) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" contains invalid data`
      }
    }
  }
}