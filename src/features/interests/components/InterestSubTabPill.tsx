import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Heart, Send, Star } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

export type SubTabType = 'received' | 'sent' | 'accepted' | 'shortlisted';

interface InterestSubTabPillProps {
  type: SubTabType;
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}

export const InterestSubTabPill: React.FC<InterestSubTabPillProps> = ({
  type,
  label,
  count,
  isActive,
  onPress,
}) => {
  const theme = useTheme();

  const renderIcon = () => {
    const iconSize = 14;
    const color = isActive ? theme.colors.primary : theme.colors.textSecondary;

    switch (type) {
      case 'received':
        return <Heart size={iconSize} color={color} style={styles.icon} />;
      case 'sent':
        return <Send size={iconSize} color={color} style={styles.icon} />;
      case 'accepted':
        return <Heart size={iconSize} color={color} fill={isActive ? theme.colors.primary : 'transparent'} style={styles.icon} />;
      case 'shortlisted':
        return <Star size={iconSize} color={isActive ? '#F57C00' : color} fill={isActive ? '#F57C00' : 'transparent'} style={styles.icon} />;
      default:
        return null;
    }
  };

  const activeColor = type === 'shortlisted' ? '#F57C00' : theme.colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.pillContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: isActive ? activeColor : theme.colors.border,
          borderWidth: 1.5,
        },
      ]}
    >
      {renderIcon()}

      <Text
        style={[
          styles.labelText,
          {
            color: isActive ? activeColor : theme.colors.textSecondary,
            fontFamily: isActive ? fontFamilies.bold : fontFamilies.medium,
          },
        ]}
      >
        {label}
      </Text>

      {/* Count Badge */}
      <View
        style={[
          styles.countBadge,
          {
            backgroundColor: isActive ? activeColor : '#E0E0E0',
          },
        ]}
      >
        <Text
          style={[
            styles.countText,
            {
              color: isActive ? '#FFFFFF' : '#424242',
            },
          ]}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    height: 38,
  },
  icon: {
    marginRight: 6,
  },
  labelText: {
    fontSize: 13,
    marginRight: 6,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: fontFamilies.bold,
    fontSize: 11,
  },
});
