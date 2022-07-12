import notion from './notion-api'
import getDatabasePageTitle from './get-database-page-title'

export default async function getBlogFeed(count = 3) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Publish Status",
          select: {
            equals: 'ready'
          }
        },
        {
          property: "Keywords",
          multi_select: {
            "does_not_contain": "off-hours"
          }
        }
      ]
    }
  })

  const posts = response["results"].slice(0, count)
  const wpm = 200
  const blogFeed = await Promise.all(posts.map(async (page) => {
    const { id } = page
    let slug = ''
    if ("url" in page) {
      const { url } = page
      const found = url.match(/(?<=https:\/\/www.notion.so\/)(.+)(?=-)/g)
      // console.log(found)
      if (found.length) {
        slug = found[0].toLowerCase()
      }
    }
    console.log({ slug })
    const blockChildrenResponse = await notion.blocks.children.list({
      block_id: id,
    })
    const title = getDatabasePageTitle(page)
    console.log(`Page title: "${title}"`)
    const description = page["properties"]["Description"]["rich_text"]
    // console.log({ description })
    let descriptionText = "", pageWordCount = 0, readingTime = 0
    if (description.length !== 0) {
      descriptionText = description.map(elem => elem["plain_text"]).join("")
    } else {
      const firstBlock = blockChildrenResponse.results[0]
      const firstBlockType = firstBlock["type"]
      const firstBlockStringArray = firstBlock[firstBlockType]["rich_text"].map(element => element["plain_text"])
      descriptionText = firstBlockStringArray.join("")
    }
    blockChildrenResponse.results.forEach(block => {
      if ("type" in block){
        const blockType = block["type"]
        // console.log('Block type: ', blockType)
        const richText = block[blockType]["rich_text"]
        // console.log(richText)
        // Exclude non-text blocks or empty paragraph blocks
        if (richText && richText.length) {
          const blockTextArray = richText.map(text => text["plain_text"])
          const blockString = blockTextArray.join("")
          // console.log(blockString)
          const blockWords = blockString.trim().split(/\s+/)
          // console.log({ blockWords })
          pageWordCount += blockWords.length
        }
      }
    })
    readingTime = Math.ceil(pageWordCount / wpm)
    // console.log('Reading time: ', readingTime)
    // console.log('Word count: ', pageWordCount)
    // console.log("----------")
    return { id, title, slug, description: descriptionText, readingTime }
  }))
  return blogFeed || []
}