import { InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import { PostHeader } from '~/modules/posts';
import { FeaturedProjectSection, ProjectSection } from '~/modules/projects';
import { getAllProjects, getFeaturedProject, filterProjectsByCategory } from '~/lib/projects';
import { ProjectMetadata } from '~/types/projects';
import DefaultLayout from '~/layouts/default-layout';
import { Page, PageBody } from '~/components/page';

export const getStaticProps = async () => {
  const projectFields = [
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug',
  ];

  const allProjects: ProjectMetadata[] = getAllProjects(projectFields);
  const featuredProject: ProjectMetadata = getFeaturedProject(projectFields);

  return {
    props: { allProjects, featuredProject },
  };
};

type ProjectsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectsIndexPage: NextPage<ProjectsIndexPageProps> = ({ allProjects, featuredProject }) => {
  const filteredProjects = filterProjectsByCategory(allProjects);

  return (
    <DefaultLayout>
      <MainContent pageTitle="Projects">
        <Page>
          <PostHeader title="Projects" />
          <PageBody>
            <div className="space-y-12">
              <FeaturedProjectSection title="Featured project" project={featuredProject} />
              {filteredProjects.map(filteredProject => (
                <ProjectSection
                  key={filteredProject.category}
                  title={filteredProject.title}
                  projects={filteredProject.projects}
                />
              ))}
            </div>
          </PageBody>
        </Page>
      </MainContent>
    </DefaultLayout>
  );
};

export default ProjectsIndexPage;
