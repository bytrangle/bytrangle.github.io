import { ExtendedRecordMap } from 'notion-types'

export interface PageError {
  message?: string
  statusCode: number
}

export interface PageProps {
  site?: Site
  recordMap?: ExtendedRecordMap
  pageId?: string
  error?: PageError
}

export interface Site {
  name: string
  domain: string
  // opengraph metadata
  description?: string
}