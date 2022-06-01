import type { ColorsType, CSS } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import { IconByName } from '@pikas-ui/icons'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as SelectPrimitive from '@radix-ui/react-select'
import { useEffect, useState } from 'react'

import { Text } from '../../text'
import { Textfield } from '../textfield'

const Container = styled('div', {
  variants: {
    fontSize: {
      xs: {
        fontSize: '$EM-X-SMALL',
      },
      sm: {
        fontSize: '$EM-SMALL',
      },
      md: {
        fontSize: '$EM-MEDIUM',
      },
      lg: {
        fontSize: '$EM-LARGE',
      },
    },
  },
})

const SelectContainer = styled(SelectPrimitive.Root, {})

const Trigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  br: 'sm',
  padding: '0 16px',
  cursor: 'pointer',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: `$GRAY_LIGHTER`,
  width: '100%',

  variants: {
    borderRadius: {
      sm: {
        br: 'sm',
      },
      md: {
        br: 'md',
      },
      lg: {
        br: 'lg',
      },
      round: {
        br: 'round',
      },
    },
    padding: {
      none: {
        padding: 0,
      },
      xs: {
        padding: '2px 4px',
      },
      sm: {
        padding: '4px 8px',
      },
      md: {
        padding: '8px 16px',
      },
      lg: {
        padding: '16px 32px',
      },
    },
  },

  defaultVariants: {
    padding: 'md',
    borderRadius: 'md',
  },
})

const SelectValue = styled(SelectPrimitive.Value, {})

const Icon = styled(SelectPrimitive.Icon, {
  marginLeft: 4,
})

const Content = styled(SelectPrimitive.Content, {
  backgroundColor: '$WHITE',
  br: 'sm',
  boxShadow: '$ELEVATION_1',
})

const Viewport = styled(SelectPrimitive.Viewport, {
  padding: 4,
})

const Group = styled(SelectPrimitive.Group, {})

const scrollButtonStyles: CSS = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  cursor: 'default',
}

const ScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
)

const ScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
)

const ItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Separator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: '$GRAY_LIGHTER',
  margin: 5,
})

const GroupLabel = styled(SelectPrimitive.Label, {
  padding: '4px 16px 0px 24px',
  fontWeight: '$MEDIUM',
  fontSize: '$EM-SMALL',
})

const Item = styled(SelectPrimitive.Item, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  userSelect: 'none',
  padding: '4px 16px 4px 24px',
  br: 'sm',
  cursor: 'pointer',
  transition: 'all 100ms',

  '&[data-disabled]': {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$PRIMARY_LIGHTER',
    color: '$WHITE',
    fill: '$WHITE',
  },
})

const ItemText = styled(SelectPrimitive.ItemText, {
  fontSize: '$EM-SMALL',
})

const Label = styled(LabelPrimitive.Root, {
  marginBottom: 5,
  display: 'block',
  fontSize: '$EM-MEDIUM',
})

const SearchContainer = styled('div', {
  padding: 8,
})

export type SelectItemType = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  searchValue?: string
  hidden?: boolean
}

export interface SelectProps {
  styles?: {
    selectContainer?: CSS
    trigger?: CSS
  }
  hasSearch?: boolean
  searchPlaceholder?: string

  label?: string
  borderRadius?: 'round' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  fontSize?: 'xs' | 'sm' | 'md' | 'lg'
  border?: 'none' | ColorsType
  data: {
    name?: string
    hidden?: boolean
    items: Array<SelectItemType>
  }[]
  id?: string
  onChange?: (value: string) => void
  setFieldValue?: (id: string, value: string) => void
  defaultValue: string
  ariaLabel?: string
  textError?: string
  dir?: 'ltr' | 'rtl'
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

export const Select: React.FC<SelectProps> = ({
  data,
  styles,
  onChange,
  defaultValue,
  label,
  hasSearch,
  searchPlaceholder,
  id,
  ariaLabel,
  setFieldValue,
  borderRadius,
  padding,
  textError,
  dir,
  onOpenChange,
  defaultOpen,
  border,
  fontSize,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [formatedData, setFormatedData] = useState(data)

  useEffect(() => {
    setFormatedData(
      data.map((group) => {
        const items = group.items.map((item) => {
          return {
            ...item,
            hidden: item.searchValue
              ? !item.searchValue?.includes(searchValue)
              : false,
          }
        })

        return {
          ...group,
          hidden: !items.some((item) => !item.hidden),
          items,
        }
      })
    )
  }, [data, searchValue])

  const handleChange = (value: string): void => {
    onChange?.(value)

    if (id) {
      setFieldValue?.(id, value)
    }
  }

  const handleOpenChange = (open: boolean): void => {
    onOpenChange?.(open)

    if (!open) {
      setSearchValue('')
    }
  }

  const getIconSize = (): number => {
    switch (fontSize) {
      case 'xs':
        return 12
      case 'sm':
        return 16
      case 'md':
        return 20
      case 'lg':
        return 24
      default:
        return 16
    }
  }

  return (
    <Container fontSize={fontSize}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <SelectContainer
        defaultValue={defaultValue}
        onValueChange={handleChange}
        dir={dir}
        onOpenChange={handleOpenChange}
        defaultOpen={defaultOpen}
        css={{
          ...styles?.selectContainer,
        }}
      >
        <Trigger
          aria-label={ariaLabel}
          borderRadius={borderRadius}
          padding={padding}
          css={{
            ...styles?.trigger,
            ...(border === 'none'
              ? {
                  borderWidth: 0,
                }
              : {
                  borderColor: border,
                }),
          }}
        >
          <SelectValue />
          <Icon>
            <IconByName
              name="bx:chevron-down"
              size={getIconSize()}
              color="BLACK"
            />
          </Icon>
        </Trigger>

        <Content>
          {hasSearch ? (
            <>
              <SearchContainer>
                <Textfield
                  onChange={(e): void => setSearchValue(e.target.value)}
                  placeholder={searchPlaceholder}
                  borderRadius="round"
                  padding="sm"
                  fontSize="sm"
                />
              </SearchContainer>
              <Separator />
            </>
          ) : null}

          <ScrollUpButton>
            <IconByName name="bx:chevron-up" size={20} color="BLACK" />
          </ScrollUpButton>
          <Viewport>
            {formatedData.map((group, groupIndex) => {
              const res = []
              const hidden = !group.items.some((item) => !item.hidden)

              if (
                groupIndex > 0 &&
                !hidden &&
                !formatedData[groupIndex - 1]?.hidden
              ) {
                res.push(<Separator key={`separator-${groupIndex}`} />)
              }

              res.push(
                <Group
                  key={groupIndex}
                  css={{
                    ...(hidden ? { display: 'none' } : {}),
                  }}
                >
                  {group.name ? <GroupLabel>{group.name}</GroupLabel> : null}
                  {group.items.map((item, itemIndex) => (
                    <Item
                      key={itemIndex}
                      value={item.value}
                      disabled={item.disabled}
                      css={{
                        ...(item.hidden ? { display: 'none' } : {}),
                      }}
                    >
                      <ItemText>{item.label}</ItemText>
                      <ItemIndicator>
                        <IconByName name="bx:check" size={20} />
                      </ItemIndicator>
                    </Item>
                  ))}
                </Group>
              )

              return res
            })}
          </Viewport>
          <ScrollDownButton>
            <IconByName name="bx:chevron-down" size={20} color="BLACK" />
          </ScrollDownButton>
        </Content>
      </SelectContainer>

      {textError ? (
        <Text style={{ marginTop: 5 }} component="span" variant="error">
          {textError}
        </Text>
      ) : null}
    </Container>
  )
}

Select.defaultProps = {
  fontSize: 'md',
}
