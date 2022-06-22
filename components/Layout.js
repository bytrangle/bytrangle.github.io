import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Container from "./Container"

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

const Layout = ({ frontmatter, recordMap }) => {
  const title = frontmatter?.properties.Name?.title[0]?.plain_text
  console.log({ title })
  return (
    <Container
      fullWidth={false}
    >
      <article className="prose dark:prose-dark">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">{title}</h1>
        <div className="prose prose-slate dark:prose-dark">
          <NotionRenderer
            recordMap={recordMap}
            components={{
              Code
            }}
          />
        </div>
      </article>
    </Container>
  )
}

export default Layout