import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

export interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  rightElement,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={{
              padding: theme.spacing.xs,
              marginRight: theme.spacing.sm,
              borderRadius: theme.radius.full,
              backgroundColor: theme.colors.surface,
            }}
            accessibilityRole="button"
            accessibilityLabel="Go Back"
          >
            <ArrowLeft size={22} color={theme.colors.text} />
          </TouchableOpacity>
        ) : null}
        {title ? <AppText variant="h2">{title}</AppText> : null}
      </View>
      {rightElement ? <View>{rightElement}</View> : <View style={{ width: 32 }} />}
    </View>
  );
};
