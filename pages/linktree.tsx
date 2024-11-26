import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { MainContent } from '~/components/layout';
import { LinktreeHeader, LinktreeSection } from '~/modules/linktree';
import DefaultLayout from '~/layouts/default-layout';
import { PageBody } from '~/components/page';
import type { NextPage } from '~/types/next';

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
    <MainContent
      pageTitle="Linktree"
      pageDescription="Everywhere I am on the Internet, on one neatly-organised list!"
    >
      <LinktreeHeader />
      <PageBody>
        <div className="space-y-12">
          {linktree.map(tree => (
            <LinktreeSection key={tree.category} category={tree.category} items={tree.items} />
          ))}
        </div>
      </PageBody>
    </MainContent>
  );
};

LinktreePage.layout = page => <DefaultLayout>{page}</DefaultLayout>;

export default LinktreePage;
