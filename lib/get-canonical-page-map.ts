import { getCanonicalPageId } from 'notion-utils'
import notion  from './notion-api'

const databaseId = 'cc368b47772a4a1aa36e1f52c507d20d'
// const databaseId = process.env.NOTION_DATABASE_ID

export default async function getCanonicalPageMap() {
  const database = await notion.getPage(databaseId)
  const { block } = database
  const canonicalPageMap = Object.keys(block).reduce(
    (map, pageId: string) => {
      const props = block[pageId]
      if (props.value && props.value.type === 'page' && props.value.parent_table === 'collection') {
        console.log('Page ID: ', pageId)
        const canonicalId = getCanonicalPageId(pageId, database)
        console.log(props)
        return {
          ...map,
          [canonicalId]: props.value
        }
      }
      return map
    },
    {}
  )
  console.log({ canonicalPageMap })
  // for (const [id, props] of Object.entries(block)) {
  //   if (props.value && props.value.type === 'page' && props.value.parent_table === 'collection') {
  //     console.log('Page id', id)
  //     console.log('Title: ', props.value.properties)
  //     const canonicalId = getCanonicalPageId(id, database)
  //     console.log({ canonicalId })
  //   }
  // }
  return canonicalPageMap
}