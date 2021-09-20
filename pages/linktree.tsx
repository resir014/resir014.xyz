import * as React from 'react'
import { InferGetStaticPropsType, NextPage } from 'next'
import { Stack } from '@resir014/chungking-react'
import { LinktreeCategoryItem } from '~/types/default'
import { Content, Page } from '~/components/layout'
import { Post, PostBody, PostHeader } from '~/modules/posts'
import { LinktreeCard, LinktreeList } from '~/modules/linktree'
import { H2 } from '~/modules/markdown'

export const getStaticProps = async () => {
  const data = await import('_data/linktree.json')
  const linktree: LinktreeCategoryItem[] = data.default

  return {
    props: { linktree }
  }
}

type LinktreePageProps = InferGetStaticPropsType<typeof getStaticProps>

const LinktreePage: NextPage<LinktreePageProps> = ({ linktree }) => {
  return (
    <Page pageTitle="Linktree">
      <Content>
        <Post>
          <PostHeader title="Linktree" lead="Everywhere I am on the Internet, in one neatly-organised list!" />
          <PostBody spacing="lg">
            {linktree.map((tree) => (
              <Stack spacing="md" key={tree.category}>
                <H2>{tree.category}</H2>
                <LinktreeList>
                  {tree.items.map((item) => (
                    <LinktreeCard key={item.url} item={item} />
                  ))}
                </LinktreeList>
              </Stack>
            ))}
          </PostBody>
        </Post>
      </Content>
    </Page>
  )
}

export default LinktreePage
