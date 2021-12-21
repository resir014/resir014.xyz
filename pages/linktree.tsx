import * as React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { Content } from '~/components/layout';
import { LinktreeHeader, LinktreeSection } from '~/modules/linktree';
import DefaultLayout from '~/layouts/default-layout';
import { PageBody } from '~/components/page';

export async function getStaticProps() {
  const data = await import('~/lib/data/linktree');
  const linktree = data.default;

  return {
    props: { linktree },
  };
}

type LinktreePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LinktreePage: NextPage<LinktreePageProps> = ({ linktree }) => {
  return (
    <DefaultLayout>
      <Content pageTitle="Linktree">
        <LinktreeHeader />
        <PageBody>
          <div className="space-y-12">
            {linktree.map(tree => (
              <LinktreeSection key={tree.category} category={tree.category} items={tree.items} />
            ))}
          </div>
        </PageBody>
      </Content>
    </DefaultLayout>
  );
};

export default LinktreePage;
