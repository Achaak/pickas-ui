import type { ColorsType } from '@pikas-ui/styles'
import { theme } from '@pikas-ui/styles'
import { MoonLoader as MoonLoaderDefault } from 'react-spinners'
import React from 'react'

export interface MoonLoaderProps {
  size: number | string
  color: ColorsType
  loading?: boolean
  speedMultiplier?: number
}

export const MoonLoader: React.FC<MoonLoaderProps> = ({
  size,
  color,
  loading,
  speedMultiplier,
}) => {
  return (
    <MoonLoaderDefault
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

MoonLoader.defaultProps = {
  loading: true,
}
