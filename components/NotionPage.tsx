import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'

// utils
import { getPageTitle } from 'notion-utils'
import * as types from 'lib/types'
import mapPageUrl, { getCanonicalPageUrl } from 'lib/map-page-url'
import * as config from 'lib/config'

// components
import PageHead from './PageHead'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  })
)

const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code
    }),
    []
  )
  const pageHeader = <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl'>{getPageTitle(recordMap)}</h1>
  const siteMapPageUrl = React.useMemo(() => {
    return mapPageUrl(site, recordMap)
  }, [site, recordMap])
  if (router.isFallback) {
    return <p>Loading...</p>
  }
  const title = getPageTitle(recordMap)
  console.log({ title })

  const canonicalPageUrl = !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const socialDescription = config.description
  return (
    <>
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        url={canonicalPageUrl}
      />
      <div className='notion-page-wrapper px-4 sm:px-6 md:px-8'>
        <div className='notion-page-content max-w-3xl mx-auto pb-28'>
          <article className='relative pt-10'>
          <NotionRenderer
            className='class-name'
            bodyClassName='body-class-name'
            components={components}
            // header={header}
            recordMap={recordMap}
            darkMode={false}
            mapPageUrl={siteMapPageUrl}
            // fullPage={true}
            pageHeader={pageHeader}
            // rootPageId={rootPageId}
          />
          </article>
        </div>
      </div>
    </>
  )
}

export default NotionPage