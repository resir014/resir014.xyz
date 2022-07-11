import { InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import { PostHeader } from '~/modules/posts';
import { FeaturedProjectSection, ProjectSection } from '~/modules/projects';
import { getAllProjects, getFeaturedProject, filterProjectsByCategory } from '~/lib/projects';
import DefaultLayout from '~/layouts/default-layout';
import { Page, PageBody } from '~/components/page';
import { Divider } from '~/components/ui';

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

  const allProjects = await getAllProjects(projectFields);
  const featuredProject = await getFeaturedProject(projectFields);

  const projectsByCategory = filterProjectsByCategory(allProjects);

  return {
    props: { projectsByCategory, featuredProject },
  };
};

type ProjectsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectsIndexPage: NextPage<ProjectsIndexPageProps> = ({
  projectsByCategory,
  featuredProject,
}) => {
  return (
    <DefaultLayout>
      <MainContent pageTitle="Projects">
        <Page>
          <PostHeader title="Projects" />
          <PageBody>
            <div className="space-y-12">
              <FeaturedProjectSection title="Featured project" project={featuredProject} />
              <Divider size="lg" />
              {projectsByCategory.map(filteredProject => (
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
