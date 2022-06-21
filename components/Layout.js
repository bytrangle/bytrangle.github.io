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
      <article className="prose">
        <h1 className="font-bold text-3xl text-black">{title}</h1>
        <div>
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