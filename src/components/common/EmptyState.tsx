import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppButton } from '../buttons/AppButton';

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionTitle?: string;
  onActionPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionTitle,
  onActionPress,
  icon,
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
          marginVertical: theme.spacing.xl,
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginBottom: theme.spacing.md }}>{icon}</View> : null}
      <AppText variant="h3" align="center" style={{ marginBottom: theme.spacing.xs }}>
        {title}
      </AppText>
      {description ? (
        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          align="center"
          style={{ marginBottom: theme.spacing.lg }}
        >
          {description}
        </AppText>
      ) : null}
      {actionTitle && onActionPress ? (
        <AppButton title={actionTitle} onPress={onActionPress} fullWidth={false} />
      ) : null}
    </View>
  );
};
