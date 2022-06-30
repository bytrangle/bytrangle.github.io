export interface SiteConfig {
  name: string
  domain: string
  author: string
  description?: string
  language?: string

  twitter?: string

  includeNotionIdInUrls?: boolean
}

const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}

export default siteConfig