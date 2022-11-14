export const pikasBorderStyles = {};

export type PikasBorderStyles = typeof pikasBorderStyles;
export type PikasBorderStyle = keyof PikasBorderStyles;

export type BorderStylesRecordValue = string;
export type BorderStylesRecordKey = PikasBorderStyle | number | string;
export type BorderStylesRecord = Record<
  BorderStylesRecordKey,
  BorderStylesRecordValue
>;

export const loadBorderStyles = <T extends BorderStylesRecord>(
  values:
    | T
    | {
        [key in keyof PikasBorderStyles]?: BorderStylesRecordValue;
      }
): PikasBorderStyles & T =>
  ({
    ...pikasBorderStyles,
    ...values,
  } as PikasBorderStyles & T);
