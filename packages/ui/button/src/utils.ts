import type { CSS } from '@pikas-ui/styles'
import fontColorContrast from 'font-color-contrast'

export const getContentColor = ({
  contentColorHex,
  colorHex,
  outlined,
}: {
  contentColorHex?: string
  colorHex?: string
  outlined?: boolean
}): string | undefined => {
  if (contentColorHex) {
    return contentColorHex
  }

  if (!outlined) {
    return fontColorContrast(colorHex || '', 0.7)
  } else {
    return colorHex
  }
}

export const getColors = ({
  colorHex,
  outlined,
  contentColorHex,
}: {
  outlined?: boolean
  colorHex?: string
  contentColorHex?: string
}): CSS => {
  if (!outlined) {
    const colors: CSS = {
      backgroundColor: colorHex,
      borderColor: colorHex,
      color: getContentColor({
        contentColorHex,
        colorHex,
        outlined,
      }),
    }

    return colors
  } else {
    const colors: CSS = {
      backgroundColor: '$TRANSPARENT',
      borderColor: colorHex,
      color: getContentColor({
        contentColorHex,
        colorHex,
        outlined,
      }),
    }

    return colors
  }
}