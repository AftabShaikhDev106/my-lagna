import React from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  StatusBar,
  StatusBarProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  paddingHorizontal?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  paddingHorizontal,
  style,
  contentContainerStyle,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const horizontalPadding = paddingHorizontal ?? theme.spacing.md;

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const statusBarProps: StatusBarProps = {
    barStyle: theme.isDark ? 'light-content' : 'dark-content',
    ...(theme.colors.background ? ({ backgroundColor: theme.colors.background } as any) : {}),
  };

  if (scrollable) {
    return (
      <View style={[containerStyle, style]}>
        <StatusBar {...statusBarProps} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingHorizontal: horizontalPadding },
            contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        containerStyle,
        { paddingHorizontal: horizontalPadding },
        style,
      ]}
    >
      <StatusBar {...statusBarProps} />
      {children}
    </View>
  );
};
