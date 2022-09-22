import { ExampleContainer } from '@/components/ExampleContainer'
import { Select } from '@pikas-ui/select'

export const SelectExample: React.FC = () => {
  return (
    <ExampleContainer>
      <Select
        defaultValue="option-1-1"
        data={[
          {
            name: 'Option 1',
            items: [
              {
                label: 'Option 1.1',
                value: 'option-1-1',
              },
              {
                label: 'Option 1.2',
                value: 'option-1-2',
              },
            ],
          },
        ]}
      />
      <Select
        defaultValue="option-1-1"
        hasSearch
        data={[
          {
            name: 'Option 1',
            items: [
              {
                label: 'Option 1.1',
                value: 'option-1-1',
              },
              {
                label: 'Option 1.2',
                value: 'option-1-2',
              },
            ],
          },
          {
            name: 'Option 2',
            items: [
              {
                label: 'Option 2.1',
                value: 'option-2-1',
              },
              {
                label: 'Option 2.2',
                value: 'option-2-2',
              },
            ],
          },
        ]}
      />
    </ExampleContainer>
  )
}