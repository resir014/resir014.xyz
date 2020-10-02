import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '~/lib/posts'
import { generateRSS } from '~/lib/rss'
import { BasePostProps } from '~/types/posts'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts: BasePostProps[] = getAllPosts(['category', 'title', 'lead', 'slug', 'date', 'content'], 'article')
    const feed = generateRSS(posts)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.end(feed)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default handler
