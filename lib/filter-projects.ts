import { ProjectMetadata } from '~/types/projects'

export default function filterProjectsByCategory(projects: ProjectMetadata[]) {
  return [
    {
      title: 'Portfolio',
      category: 'portfolio',
      projects: projects.filter((project) => project.category === 'portfolio')
    },
    {
      title: 'Open-source stuff',
      category: 'oss',
      projects: projects.filter((project) => project.category === 'oss')
    },
    {
      title: 'Other stuff',
      category: 'other',
      projects: projects.filter((project) => project.category === 'other')
    }
  ]
}
