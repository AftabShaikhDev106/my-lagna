import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../hooks/useTheme';
import { fontFamilies } from '../theme/typography';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigationTheme = useMemo(() => {
    const baseTheme = theme.isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      dark: theme.isDark,
      colors: {
        ...baseTheme.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.accent,
      },
      fonts: {
        regular: {
          fontFamily: theme?.typography?.body?.fontFamily ?? fontFamilies.regular,
          fontWeight: '400' as const,
        },
        medium: {
          fontFamily: theme?.typography?.bodyMedium?.fontFamily ?? fontFamilies.medium,
          fontWeight: '500' as const,
        },
        bold: {
          fontFamily: theme?.typography?.h1?.fontFamily ?? fontFamilies.bold,
          fontWeight: '700' as const,
        },
        heavy: {
          fontFamily: theme?.typography?.display?.fontFamily ?? fontFamilies.bold,
          fontWeight: '800' as const,
        },
      },
    };
  }, [theme]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="AppStack" component={AppNavigator} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
