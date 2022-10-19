import type {
  PikasColor,
  BorderRadius,
  PikasConfigRecord,
} from '@pikas-ui/styles'
import { styled, useTheme } from '@pikas-ui/styles'
import { Label, TextError, Description } from '@pikas-ui/text'
import fontColorContrast from 'font-color-contrast'
import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import React, { useState } from 'react'
import type { IconCSS } from '@pikas-ui/icons'
import { IconByName } from '@pikas-ui/icons'
import type { TooltipCSS } from '@pikas-ui/tooltip'
import { Tooltip } from '@pikas-ui/tooltip'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
})

const TextareaContainer = styled('div', {
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'solid',

  variants: {
    padding: {
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
    focus: {
      true: {
        outline: 'solid',
        outlineColor: '$PRIMARY',
        outlineWidth: 2,
      },
    },
  },
})

const TextareaStyled = styled('textarea', {
  width: '100%',
  outline: 'none',
  fontSize: '$EM-SMALL',
  border: 'none',
  fontFamily: '$roboto',
  backgroundColor: '$TRANSPARENT',
})

const LabelContainer = styled('div', {
  display: 'flex',
  marginBottom: 4,
})

const Required = styled('div', {
  color: '$WARNING',
  marginLeft: 4,
})

export const textareaPadding = {
  sm: true,
  md: true,
  lg: true,
} as const
export type TextareaPadding = keyof typeof textareaPadding

export const textareaResize = {
  none: true,
  vertical: true,
  horizontal: true,
  both: true,
} as const
export type TextareaResize = keyof typeof textareaResize

export interface TextareaCSS<Config extends PikasConfigRecord = any> {
  container?: Config['CSS']
  textareaContainer?: Config['CSS']
  textarea?: Config['CSS']
  infoTooltip?: TooltipCSS<Config>
  infoIcon?: IconCSS<Config>
  label?: Config['CSS']
  description?: Config['CSS']
  textError?: Config['CSS']
  required?: Config['CSS']
}

export type TextareaProps<Config extends PikasConfigRecord = any> = {
  id?: string
  label?: string
  boxShadow?: Config['theme']['shadow'] | 'none'
  borderRadius?: BorderRadius
  padding?: TextareaPadding
  fontSize?: Config['theme']['fontSize']
  textError?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  css?: TextareaCSS<Config>
  outline?: boolean
  resize?: TextareaResize
  description?: string
  width?: string | number
  maxWidth?: string | number
  height?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  minWidth?: string | number
  borderColorName?: keyof Config['theme']['colors']
  borderColorHex?: string
  borderWidth?: number
  colorName?: keyof Config['theme']['colors']
  colorHex?: string
  placeholderColorName?: keyof Config['theme']['colors']
  placeholderColorHex?: string
  backgroundColorName?: keyof Config['theme']['colors']
  backgroundColorHex?: string
  info?: React.ReactNode
  data?: DOMStringMap
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaInner = <Config extends PikasConfigRecord>(
  {
    id,
    onChange,
    boxShadow = 'DIMINUTION_1' as Config['theme']['shadow'],
    borderRadius = 'md',
    padding = 'md',
    fontSize = 'EM-MEDIUM' as Config['theme']['fontSize'],
    textError,
    label,
    css,
    borderColorName = 'TRANSPARENT' as keyof Config['theme']['colors'],
    borderWidth = 0,
    backgroundColorName = 'GRAY_LIGHTEST_1' as keyof Config['theme']['colors'],
    outline = true,
    resize,
    description,
    width = '100%',
    maxWidth = '100%',
    height = 300,
    maxHeight,
    minHeight,
    minWidth,
    backgroundColorHex,
    borderColorHex,
    colorName,
    colorHex,
    placeholderColorName,
    placeholderColorHex,
    info,
    required,
    disabled = false,
    data,
    ...props
  }: TextareaProps<Config>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
): JSX.Element => {
  const [focus, setFocus] = useState(false)
  const theme = useTheme<Config>()

  const onChangeTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (onChange) {
      onChange(e)
    }
  }

  const getColor = ({
    colorName,
    colorHex,
  }: {
    colorName?: keyof Config['theme']['colors']
    colorHex?: string
  }): string => {
    return colorHex || colorName
      ? `$${colorName}`
      : undefined ||
          (theme &&
            fontColorContrast(
              theme.colors[backgroundColorName || 'WHITE'].value,
              0.7
            )) ||
          ''
  }

  return (
    <Container
      css={{
        fontSize: `$${fontSize}`,
        width: width,
        maxWidth: maxWidth,
        minWidth: minWidth,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : undefined,

        '& > *': {
          pointerEvents: disabled ? 'none' : undefined,
        },

        ...css?.container,
      }}
    >
      {label ? (
        <LabelContainer>
          <Label<Config> htmlFor={id} css={css?.label}>
            {label}
          </Label>

          {required ? <Required css={css?.required}>*</Required> : null}
          {info ? (
            <Tooltip content={info} css={css?.infoTooltip}>
              <IconByName<Config>
                name="bx:info-circle"
                colorName="BLACK_LIGHT"
                css={{
                  container: {
                    marginLeft: 4,
                    ...css?.infoIcon?.container,
                  },
                  svg: {
                    ...css?.infoIcon?.svg,
                  },
                }}
              />
            </Tooltip>
          ) : null}
        </LabelContainer>
      ) : null}

      {description ? (
        <Description<Config>
          css={{
            marginBottom: 4,
            ...css?.description,
          }}
        >
          {description}
        </Description>
      ) : null}

      <TextareaContainer
        padding={padding}
        focus={outline ? focus : undefined}
        css={{
          br: borderRadius,
          borderColor:
            borderColorHex || borderColorName
              ? `$${borderColorName}`
              : undefined,
          backgroundColor:
            backgroundColorHex || backgroundColorName
              ? `$${backgroundColorName}`
              : undefined,
          boxShadow: `$${boxShadow}`,
          borderWidth: borderWidth,

          ...css?.textareaContainer,
        }}
      >
        <TextareaStyled
          ref={ref}
          id={id}
          onChange={onChangeTextarea}
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(false)}
          required={required}
          disabled={disabled}
          css={{
            resize: resize,
            height: height,
            maxHeight: maxHeight,
            minHeight: minHeight,
            color: getColor({ colorName: colorName, colorHex: colorHex }),

            '&::placeholder': {
              color: getColor({
                colorName: placeholderColorName,
                colorHex: placeholderColorHex,
              }),
            },

            ...css?.textarea,
          }}
          {...props}
          {...data}
        />
      </TextareaContainer>

      {textError && (
        <TextError<Config> css={{ marginTop: 5, ...css?.textError }}>
          {textError}
        </TextError>
      )}
    </Container>
  )
}

export const Textarea = forwardRef(TextareaInner) as <
  Config extends PikasConfigRecord = any
>(
  props: TextareaProps<Config> & {
    ref?: React.ForwardedRef<HTMLTextAreaElement>
  }
) => ReturnType<typeof TextareaInner>
