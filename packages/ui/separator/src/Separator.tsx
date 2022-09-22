import type { BorderRadiusType, ColorsType, CSS } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import React from 'react'

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  overflow: 'hidden',
})

export type SeparatorOrientationType = SeparatorPrimitive.Orientation

export interface SeparatorProps {
  orientation?: SeparatorOrientationType
  className?: string
  size?: number
  css?: CSS
  color?: ColorsType
  borderRadius?: BorderRadiusType
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation,
  css,
  className,
  color,
  size,
  borderRadius,
}) => {
  return (
    <StyledSeparator
      orientation={orientation}
      className={className}
      css={{
        backgroundColor: `$${color}`,
        br: borderRadius,

        '&[data-orientation=horizontal]': {
          minHeight: size,
          height: size,
          minWidth: '100%',
          width: '100%',
        },
        '&[data-orientation=vertical]': {
          minHeight: '100%',
          height: '100%',
          minWidth: size,
          width: size,
        },

        ...css,
      }}
    />
  )
}

Separator.defaultProps = {
  orientation: 'horizontal',
  size: 2,
  color: 'GRAY_LIGHT',
}