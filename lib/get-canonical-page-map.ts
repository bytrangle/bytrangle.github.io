import { getCanonicalPageId } from 'notion-utils'
import notion  from './notion-api'

const databaseId = 'cc368b47772a4a1aa36e1f52c507d20d'

export default async function getCanonicalPageMap() {
  const database = await notion.getPage(databaseId)
  const { block } = database
  const canonicalPageMap = Object.keys(block).reduce(
    (map, pageId: string) => {
      const props = block[pageId]
      if (props.value && props.value.type === 'page' && props.value.parent_table === 'collection') {
        console.log('Page ID: ', pageId)
        const canonicalId = getCanonicalPageId(pageId, database)
        console.log(props.value)
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
  return canonicalPageMap
}