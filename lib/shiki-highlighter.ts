import { getHighlighter } from 'shiki'

export default async function getShikiHighlighter() {
  const highlighter = await getHighlighter({ theme: 'dark-plus' })

  return highlighter
}
