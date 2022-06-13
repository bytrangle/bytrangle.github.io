import { NotionRenderer } from 'react-notion-x'

const Layout = ({ frontmatter, recordMap }) => {
  const title = frontmatter.properties.Name?.title[0]?.plain_text
  console.log({ title })
  return (
    <article>
      <h1>{title}</h1>
      <div>
        <NotionRenderer
          recordMap={recordMap}
        />
      </div>
    </article>
  )
}

export default Layout