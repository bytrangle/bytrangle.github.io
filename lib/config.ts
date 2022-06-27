/**
 * Site-wide app configuration.
 *
 * This file pulls from the root "site.config.ts" as well as environment variables
 * for optional depenencies.
 */

import { getSiteConfig } from './get-config-value'
import { Site } from './types'

export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'

// general site config
export const name: string = getSiteConfig('name')
export const domain: string = getSiteConfig('domain')
export const description: string = getSiteConfig('description', 'A non-trivial blog built with Next.js and Notion')
export const language: string = getSiteConfig('language', 'en')

export const site: Site = {
  domain,
  name,
  description
}
// export const includeNotionIdInUrls: boolean