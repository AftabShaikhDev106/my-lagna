import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react-native';
import { fontFamilies } from '../../theme/typography';

export type TabKey = 'Home' | 'Discover' | 'Interests' | 'Chats' | 'Profile';

interface FloatingNavTabBarProps {
  activeTab?: TabKey;
  navigation: any;
}

export const FloatingNavTabBar: React.FC<FloatingNavTabBarProps> = ({
  activeTab = 'Home',
  navigation,
}) => {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'Home', label: 'Home' },
    { key: 'Discover', label: 'Discover' },
    { key: 'Interests', label: 'Interests' },
    { key: 'Chats', label: 'Chats' },
    { key: 'Profile', label: 'Profile' },
  ];

  const getIcon = (key: TabKey, isFocused: boolean) => {
    const color = isFocused ? '#E05638' : '#8E8A85';
    const size = 22;

    switch (key) {
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
    }
  };

  const handleTabPress = (tabKey: TabKey) => {
    try {
      navigation.navigate('MainTabs', { screen: tabKey });
    } catch {
      navigation.navigate(tabKey);
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.floatingCard}>
        {tabs.map((tab) => {
          const isFocused = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              onPress={() => handleTabPress(tab.key)}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>{getIcon(tab.key, isFocused)}</View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? '#E05638' : '#8E8A85',
                    fontFamily: isFocused ? fontFamilies.semiBold : fontFamilies.medium,
                  },
                ]}
              >
                {tab.label}
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
