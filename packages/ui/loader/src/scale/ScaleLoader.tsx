import { ScaleLoader as ScaleLoaderDefault } from 'react-spinners'
import type {
  ColorsRecord,
  Color as ColorByPikas,
  PikasColor,
} from '@pikas-ui/styles'
import { useTheme } from '@pikas-ui/styles'

export interface ScaleLoaderProps<Color extends ColorByPikas<ColorsRecord>> {
  height?: number
  width?: number
  radius?: number
  margin?: number
  color?: Color
  colorHex?: string
  loading?: boolean
  speedMultiplier?: number
}

export const ScaleLoader = <
  Color extends ColorByPikas<ColorsRecord> = PikasColor
>({
  height,
  width,
  radius,
  color = 'PRIMARY' as Color,
  colorHex,
  loading = true,
  margin,
  speedMultiplier,
}: ScaleLoaderProps<Color>): JSX.Element => {
  const theme = useTheme()

  return (
    <ScaleLoaderDefault
      height={height}
      width={width}
      radius={radius}
      margin={margin}
      speedMultiplier={speedMultiplier}
      color={
        colorHex ||
        (color ? theme?.colors[color as PikasColor].value : undefined)
      }
      loading={loading}
    />
  )
}
