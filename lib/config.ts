/**
 * Site-wide app configuration.
 *
 * This file pulls from the root "site.config.ts" as well as environment variables
 * for optional depenencies.
 */

export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'