import { lightColors, ColorTokens } from './colors';
import { typography, TypographyVariant } from './typography';
import { spacing, SpacingScale } from './spacing';
import { radius, RadiusScale } from './radius';
import { shadows, ShadowTokens } from './shadows';
import { TextStyle } from 'react-native';

export interface Theme {
  isDark: boolean;
  colors: ColorTokens;
  typography: Record<TypographyVariant, TextStyle>;
  spacing: Record<SpacingScale, number>;
  radius: Record<RadiusScale, number>;
  shadows: ShadowTokens;
}

export const lightTheme: Theme = {
  isDark: false,
  colors: lightColors,
  typography,
  spacing,
  radius,
  shadows,
};
