import path from 'path'
import { promises as fs } from 'fs'

const cache = {
  getWholeFileContent: async (fileName) => {
    try {
      const data = await fs.readFile(path.join(process.cwd(), fileName))
      return JSON.parse(data)
    }
    catch {
      return null
    }
  },
  getContentByKey: async (key, fileName) => {
    try {
      const data = await fs.readFile(path.join(process.cwd(), fileName))
      const posts = JSON.parse(data)
      console.log(posts.constructor.name)
      return posts[key]
    }
    catch {
      return null
    }
  },
  set: async (content, fileName) => {
    console.log('saving database to cache')
    return await fs.writeFile(
      path.join(process.cwd(), fileName),
      JSON.stringify(content)
    )
  },
  testRead: async (key, fileName) => {
    console.log('try reading file')
    const data = await fs.readFile(path.join(process.cwd(), fileName))
    console.log(data)
  },
  testSet: async (content, fileName) => {
    console.log('try writing to file')
    return await fs.writeFile(
      path.join(process.cwd(), fileName),
      JSON.stringify(content))
  }
}

export default cache