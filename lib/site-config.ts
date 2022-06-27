export interface SiteConfig {
  name: string
  domain: string
  author: string
  description?: string
  language?: string
}

const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}

export default siteConfig