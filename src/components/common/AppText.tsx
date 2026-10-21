import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TypographyVariant } from '../../theme/typography';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const fontStyle = theme.typography[variant];
  const textColor = color || theme.colors.text;

  const combinedStyle: TextStyle = {
    ...fontStyle,
    color: textColor,
    textAlign: align,
  };

  return (
    <RNText style={[combinedStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
