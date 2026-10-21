import { TextStyle } from 'react-native';

export const fontFamilies = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  light: 'Poppins-Light',
};

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyMedium'
  | 'caption'
  | 'button'
  | 'label';

export const typography: Record<TypographyVariant, TextStyle> = {
  display: {
    fontFamily: fontFamilies.bold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },
  h2: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  h3: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  button: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
};
