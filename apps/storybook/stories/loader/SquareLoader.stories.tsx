import { Colors, globalStyles, styled } from '@pikas-ui/styles'
import { SquareLoader } from '@pikas-ui/loader'
import type { SquareLoaderProps } from '@pikas-ui/loader'
import type { Story, Meta } from '@storybook/react'

const Container = styled('div', {
  display: 'flex',
})

export default {
  title: '@pikas-ui/loader/SquareLoader',
  component: SquareLoader,
  argTypes: {
    color: {
      description: 'Color',
      type: {
        name: 'enum',
        value: Object.keys(Colors),
        required: true,
      },
    },
    loading: {
      description: 'Loader',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    speedMultiplier: {
      description: 'Speed multiplier',
      type: {
        name: 'number',
        required: false,
      },
    },
    size: {
      description: 'Size',
      type: {
        name: 'number',
        required: false,
      },
    },
  },
} as Meta<SquareLoaderProps>

const Template: Story<SquareLoaderProps> = (args) => {
  globalStyles()

  return (
    <Container>
      <SquareLoader {...args} />
    </Container>
  )
}

export const Example = Template.bind({})
Example.args = {
  color: 'PRIMARY',
  size: 60,
  loading: true,
}