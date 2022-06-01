import type { ColorsType } from '@pikas-ui/styles'
import { theme } from '@pikas-ui/styles'
import { RingLoader as RingLoaderDefault } from 'react-spinners'
import React from 'react'

export interface RingLoaderProps {
  size: number | string
  color: ColorsType
  loading?: boolean
  speedMultiplier?: number
}

export const RingLoader: React.FC<RingLoaderProps> = ({
  size,
  color,
  loading,
  speedMultiplier,
}) => {
  return (
    <RingLoaderDefault
      size={size}
      speedMultiplier={speedMultiplier}
      color={
        color
          ? color?.includes('#')
            ? color
            : theme.colors[color as ColorsType].value
          : undefined
      }
      loading={loading}
    />
  )
}

RingLoader.defaultProps = {
  loading: true,
}
