import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
  icon,
}) => {
  const theme = useTheme();

  const getContainerStyle = (): ViewStyle => {
    let paddingVertical = theme.spacing.sm + 4;
    let paddingHorizontal = theme.spacing.lg;

    if (size === 'sm') {
      paddingVertical = theme.spacing.xs + 2;
      paddingHorizontal = theme.spacing.md;
    } else if (size === 'lg') {
      paddingVertical = theme.spacing.md;
      paddingHorizontal = theme.spacing.xl;
    }

    let backgroundColor = theme.colors.primary;
    let borderWidth = 0;
    let borderColor = 'transparent';

    if (variant === 'secondary') {
      backgroundColor = theme.colors.primarySoft;
    } else if (variant === 'outline') {
      backgroundColor = 'transparent';
      borderWidth = 1.5;
      borderColor = theme.colors.primary;
    } else if (variant === 'text') {
      backgroundColor = 'transparent';
    }

    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.full,
      alignSelf: fullWidth ? 'stretch' : 'auto',
      paddingVertical,
      paddingHorizontal,
      backgroundColor,
      borderWidth,
      borderColor,
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextColor = (): string => {
    if (disabled) return theme.colors.textMuted;
    switch (variant) {
      case 'secondary':
      case 'outline':
      case 'text':
        return theme.colors.primary;
      case 'primary':
      default:
        return theme.colors.white;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <AppText
            variant="button"
            color={getTextColor()}
            style={[{ marginLeft: icon ? theme.spacing.xs : 0 }, textStyle]}
          >
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};
