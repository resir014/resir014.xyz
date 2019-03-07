import { ProjectField } from '../types/fields'

export default function filterProjectsByCategory(
  edges: ProjectField[],
  category: string
): ProjectField[] {
  return edges.filter(edge => edge.node.fields.category === category)
}
