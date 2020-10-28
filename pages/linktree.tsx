import * as React from 'react'
import { InferGetStaticPropsType, NextPage } from 'next'
import { LinktreeCategoryItem } from '~/types/default'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'
import { LinktreeCard, LinktreeList } from '~/modules/linktree'
import { Heading, Stack } from '~/components/chungking-core'

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
        <PostHeader title="Linktree" lead="Because who needs an external service for this?" />
        <PostBody spacing="lg">
          {linktree.map((tree) => (
            <Stack spacing="md" key={tree.category}>
              <Heading>{tree.category}</Heading>
              <LinktreeList>
                {tree.items.map((item) => (
                  <LinktreeCard key={item.url} item={item} />
                ))}
              </LinktreeList>
            </Stack>
          ))}
        </PostBody>
      </Content>
    </Page>
  )
}

export default LinktreePage
