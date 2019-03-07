import { ProjectField } from '../types/fields'

export default function getFeaturedProject(edges: ProjectField[], name: string): ProjectField {
  return edges.filter(edge => edge.node.frontmatter.title === name)[0]
}
