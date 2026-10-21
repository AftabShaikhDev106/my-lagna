import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import { fontFamilies } from '../../../theme/typography';

interface HomeHeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName = 'Aftab',
  onNotificationPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>
          Good Morning, {userName} 👋
        </Text>
        <Text style={styles.subtitleText}>
          Let’s find your perfect Marathi match
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.iconButton}
          activeOpacity={0.7}
          accessibilityLabel="Notifications"
        >
          <Bell size={20} color="#3A3532" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onProfilePress}
          style={styles.iconButton}
          activeOpacity={0.7}
          accessibilityLabel="Account profile"
        >
          <User size={20} color="#3A3532" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  greetingText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    color: '#1E1B18',
    marginBottom: 4,
  },
  subtitleText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#6C635F',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE6E1',
  },
});
