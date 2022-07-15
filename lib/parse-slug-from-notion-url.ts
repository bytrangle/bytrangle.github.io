export default function getSlugFromNotionUrl(notionUrlString: string) {
  let pattern: RegExp
  if (notionUrlString.startsWith('https://www.notion.so')) {
    pattern = /(?<=https:\/\/www.notion.so\/)(.+)(?=-)/g
  } else {
    pattern = /.+(?=-)/g
  }
  const found = notionUrlString.match(pattern)
  if (found.length) {
    return found[0].toLowerCase()
  }
  return ""
}