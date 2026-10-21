import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

export interface LoadingStateProps {
  message?: string;
  style?: ViewStyle;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message, style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.xl,
        },
        style,
      ]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message ? (
        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          style={{ marginTop: theme.spacing.md }}
        >
          {message}
        </AppText>
      ) : null}
    </View>
  );
};
