import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';

export interface AppInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  const wrapperStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    height: 52,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    fontFamily: theme.typography.body.fontFamily,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    paddingVertical: 0,
  };

  return (
    <View style={[{ marginBottom: theme.spacing.md }, containerStyle]}>
      {label ? (
        <AppText
          variant="label"
          color={theme.colors.textSecondary}
          style={{ marginBottom: theme.spacing.xs }}
        >
          {label}
        </AppText>
      ) : null}

      <View style={wrapperStyle}>
        {leftIcon ? <View style={{ marginRight: theme.spacing.sm }}>{leftIcon}</View> : null}
        <RNTextInput
          placeholderTextColor={theme.colors.textMuted}
          style={[inputStyle, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon ? <View style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <AppText
          variant="caption"
          color={theme.colors.error}
          style={{ marginTop: theme.spacing.xs }}
        >
          {error}
        </AppText>
      ) : helperText ? (
        <AppText
          variant="caption"
          color={theme.colors.textMuted}
          style={{ marginTop: theme.spacing.xs }}
        >
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};
