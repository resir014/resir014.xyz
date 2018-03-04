import { ProjectField } from './types'

const filterProjectsByCategory = (edges: ProjectField[], category: string) => (
  edges.filter(edge => edge.node.fields.category === category)
)

export default filterProjectsByCategory
