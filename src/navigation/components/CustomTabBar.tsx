import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react-native';
import { fontFamilies } from '../../theme/typography';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#E05638' : '#8E8A85';
    const size = 22;

    switch (routeName) {
      case 'Home':
        return <Home size={size} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />;
      case 'Discover':
        return <Search size={size} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />;
      case 'Interests':
        return <Heart size={size} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />;
      case 'Chats':
        return <MessageSquare size={size} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />;
      case 'Profile':
        return <User size={size} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />;
      default:
        return <Home size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.floatingCard}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={(options as any).tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                {getIcon(route.name, isFocused)}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? '#E05638' : '#8E8A85',
                    fontFamily: isFocused ? fontFamilies.semiBold : fontFamilies.medium,
                  },
                ]}
              >
                {typeof label === 'string' ? label : route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 99,
  },
  floatingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 230, 225, 0.6)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconWrapper: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
  },
});
