import React from 'react';
import { View, ViewStyle } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppButton } from '../buttons/AppButton';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.xl,
          marginVertical: theme.spacing.lg,
        },
        style,
      ]}
    >
      <AlertCircle size={40} color={theme.colors.error} style={{ marginBottom: theme.spacing.sm }} />
      <AppText variant="h3" color={theme.colors.error} align="center" style={{ marginBottom: theme.spacing.xs }}>
        {title}
      </AppText>
      <AppText
        variant="body"
        color={theme.colors.textSecondary}
        align="center"
        style={{ marginBottom: theme.spacing.lg }}
      >
        {message}
      </AppText>
      {onRetry ? <AppButton title="Try Again" onPress={onRetry} variant="outline" fullWidth={false} /> : null}
    </View>
  );
};
