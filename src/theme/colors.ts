export interface ColorTokens {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primarySoft: string;
  primaryDark: string;
  accent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  success: string;
  successSoft: string;
  error: string;
  errorSoft: string;
  warning: string;
  white: string;
  black: string;
  transparent: string;
  cardShadow: string;
  badgeBackground: string;
}

export const lightColors: ColorTokens = {
  background: '#FFF8F4', // Warm cream background
  surface: '#FFFFFF',    // Clean off-white surface
  surfaceElevated: '#FFF1E8',
  primary: '#E05638',    // Coral/orange accent
  primarySoft: '#FDF0EB', // Subtle warm peach tint
  primaryDark: '#C43E23',
  accent: '#F48C6B',     // Soft coral accent
  text: '#1E1B18',       // Dark charcoal text
  textSecondary: '#6C635F', // Muted brownish gray text
  textMuted: '#9E948F',
  border: '#EFE6E1',     // Soft subtle border
  borderLight: '#F7EFEA',
  success: '#2E7D32',
  successSoft: '#E8F5E9',
  error: '#D32F2F',
  errorSoft: '#FFEBEE',
  warning: '#F57C00',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  cardShadow: 'rgba(224, 86, 56, 0.08)',
  badgeBackground: '#FFEAE2',
};

export const darkColors: ColorTokens = {
  background: '#12100E', // Rich dark brown-black surface
  surface: '#1E1A17',    // Adapted dark surface
  surfaceElevated: '#28231F',
  primary: '#FF6B52',    // Vibrant coral for dark contrast
  primarySoft: '#38221D',
  primaryDark: '#E05638',
  accent: '#FF8A65',
  text: '#F5EFEA',       // Warm off-white text
  textSecondary: '#A59B94',
  textMuted: '#7A706A',
  border: '#2E2723',
  borderLight: '#241F1C',
  success: '#4CAF50',
  successSoft: '#1B2E1E',
  error: '#EF5350',
  errorSoft: '#3B1E1E',
  warning: '#FFB74D',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  cardShadow: 'rgba(0, 0, 0, 0.4)',
  badgeBackground: '#33231E',
};
