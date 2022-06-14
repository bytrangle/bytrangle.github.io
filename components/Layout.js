import { NotionRenderer } from 'react-notion-x'
import Container from "./Container"

const Layout = ({ frontmatter, recordMap }) => {
  const title = frontmatter.properties.Name?.title[0]?.plain_text
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
          />
        </div>
      </article>
    </Container>
  )
}

export default Layout