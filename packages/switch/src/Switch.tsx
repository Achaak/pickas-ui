import type { IconProps } from '@pikas-ui/icons'
import { IconByName } from '@pikas-ui/icons'
import type { CSS, FontsSizesType } from '@pikas-ui/styles'
import type { TooltipStylesType } from '@pikas-ui/tooltip'
import { Tooltip } from '@pikas-ui/tooltip'
import { styled } from '@pikas-ui/styles'
import { Label, TextError } from '@pikas-ui/text'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import React, { useState } from 'react'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const SwitchContainer = styled('div', {
  width: '100%',
  br: 'lg',
  display: 'flex',
  alignItems: 'center',
})

const SwitchStyle = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 48,
  height: 24,
  backgroundColor: '$GRAY',
  br: 'round',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  transition: 'all 500ms',
  cursor: 'pointer',

  '&:focus': {
    boxShadow: '$ELEVATION_BOTTOM_1',
  },
  '&[data-state="checked"]': {
    backgroundColor: '$PRIMARY',
  },
})

const SwitchThumb = styled(SwitchPrimitive.Thumb, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  backgroundColor: '$WHITE',
  br: 'round',
  boxShadow: '$ELEVATION_BOTTOM_1',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    backgroundColor: '$WHITE_FIX',
    transform: 'translateX(26px)',
  },
})

const LabelContainer = styled('div', {
  display: 'flex',
})

const Required = styled('div', {
  color: '$WARNING',
  marginLeft: 4,
})

export interface SwitchStyleType {
  container?: CSS
  info?: TooltipStylesType
}

export interface SwitchProps {
  id?: string
  label?: string
  name?: string
  fontSize?: FontsSizesType
  textError?: string

  onChange?: (val: boolean) => void
  defaultChecked?: boolean
  styles?: SwitchStyleType
  disabled?: boolean
  side?: 'left' | 'right'
  Icons?: {
    checked: React.FC<IconProps>
    unchecked: React.FC<IconProps>
  }
  required?: boolean
  info?: string
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  onChange,
  fontSize,
  textError,
  label,
  styles,
  defaultChecked,
  Icons,
  disabled,
  side,
  info,
  required,
}) => {
  const [checked, setChecked] = useState(defaultChecked)

  const onChangeInput = (val: boolean): void => {
    onChange?.(val)

    setChecked(val)
  }

  const getIcon = (): React.ReactNode => {
    if (!Icons) {
      return
    }

    if (checked) {
      return <Icons.checked size={14} color="BLACK_FIX" />
    } else {
      return <Icons.unchecked size={14} color="BLACK_FIX" />
    }
  }

  return (
    <Container
      css={{
        fontSize: fontSize,
        cursor: disabled ? 'not-allowed' : undefined,
        opacity: disabled ? 0.5 : 1,

        '& > *': {
          pointerEvents: disabled ? 'none' : undefined,
        },

        ...styles?.container,
      }}
    >
      <SwitchContainer>
        {label && side === 'left' ? (
          <LabelContainer
            css={{
              marginRight: 8,
            }}
          >
            <Label htmlFor={id}>{label}</Label>

            {required ? <Required>*</Required> : null}
            {info ? (
              <Tooltip content={info} styles={styles?.info}>
                <IconByName
                  name="bx:info-circle"
                  color="BLACK_LIGHT"
                  styles={{
                    container: {
                      marginLeft: 4,
                    },
                  }}
                />
              </Tooltip>
            ) : null}
          </LabelContainer>
        ) : null}

        <SwitchStyle
          defaultChecked={defaultChecked}
          id={id}
          name={name}
          onCheckedChange={onChangeInput}
        >
          <SwitchThumb>{getIcon()}</SwitchThumb>
        </SwitchStyle>

        {label && side === 'right' ? (
          <LabelContainer
            css={{
              marginLeft: 8,
            }}
          >
            <Label htmlFor={id}>{label}</Label>

            {required ? <Required>*</Required> : null}
            {info ? (
              <Tooltip content={info} styles={styles?.info}>
                <IconByName
                  name="bx:info-circle"
                  color="BLACK_LIGHT"
                  styles={{
                    container: {
                      marginLeft: 4,
                    },
                  }}
                />
              </Tooltip>
            ) : null}
          </LabelContainer>
        ) : null}
      </SwitchContainer>

      {textError && <TextError style={{ marginTop: 5 }}>{textError}</TextError>}
    </Container>
  )
}

Switch.defaultProps = {
  fontSize: 'EM-MEDIUM',
  side: 'left',
  disabled: false,
}