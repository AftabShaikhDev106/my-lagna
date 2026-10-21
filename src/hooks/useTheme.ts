import { useTheme as useThemeFromProvider } from '../theme/ThemeProvider';
import { Theme } from '../theme/lightTheme';

export const useTheme = (): Theme => {
  return useThemeFromProvider();
};
