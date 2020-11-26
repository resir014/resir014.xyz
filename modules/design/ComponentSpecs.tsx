import * as React from 'react'
import { Box, Badge, Button, MessageBox, Paragraph, Anchor, Inline } from '@resir014/chungking-react'
import { H2, H3, H4 } from '../markdown'
import ComponentSpecimen from './components/ComponentSpecimen'

const ComponentSpecs: React.FC = () => {
  return (
    <>
      <H2>Components</H2>
      <H3>Badge</H3>
      <ComponentSpecimen spacing="sm">
        <Inline spacing="xs">
          <Box>
            <Badge>default</Badge>
          </Box>
          <Box>
            <Badge variant="grey">grey</Badge>
          </Box>
        </Inline>
      </ComponentSpecimen>
      <H3>Button</H3>
      <H4>Primary</H4>
      <ComponentSpecimen spacing="sm">
        <Inline spacing="xs">
          <Box>
            <Button variant="primary">Push Me</Button>
          </Box>
          <Box>
            <Button variant="primary" disabled>
              I&apos;m disabled
            </Button>
          </Box>
        </Inline>
        <Inline spacing="xs">
          <Box>
            <Button>Push Me</Button>
          </Box>
          <Box>
            <Button disabled>I&apos;m disabled</Button>
          </Box>
        </Inline>
        <Inline spacing="xs">
          <Box>
            <Button variant="danger">Push Me</Button>
          </Box>
          <Box>
            <Button variant="danger" disabled>
              I&apos;m disabled
            </Button>
          </Box>
        </Inline>
        <Inline spacing="lg">
          <Box>
            <Button ghosted>Push Me</Button>
          </Box>
          <Box>
            <Button ghosted disabled>
              I&apos;m disabled
            </Button>
          </Box>
        </Inline>
      </ComponentSpecimen>
      <H3>Box</H3>
      <ComponentSpecimen spacing="xs">
        <Box>I&apos;m inside a box!</Box>
        <Box backgroundColor="blue.500" p="md">
          I&apos;m inside a box with padding!
        </Box>
      </ComponentSpecimen>
      <H3>Message Box</H3>
      <ComponentSpecimen spacing="md">
        <MessageBox variant="default">
          <Paragraph>
            <strong>Info:</strong> This post is also published on <Anchor href="https://medium.com/">Medium</Anchor>.
          </Paragraph>
        </MessageBox>
        <MessageBox variant="warning">
          <Paragraph>
            <strong>Update:</strong> Phoenix 1.4 ships with <Anchor href="https://webpack.js.org/">Webpack</Anchor> by default, therefore
            this guide is now outdated.
          </Paragraph>
        </MessageBox>
      </ComponentSpecimen>
    </>
  )
}

export default ComponentSpecs
