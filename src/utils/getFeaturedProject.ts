import { ProjectField } from '../types/fields'

const getFeaturedProject = (edges: ProjectField[], name: string) => {
  return edges.filter(edge => edge.node.frontmatter.title === name)[0]
}

export default getFeaturedProject
