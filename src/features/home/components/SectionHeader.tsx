import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { fontFamilies } from '../../../theme/typography';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  onViewAllPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {onViewAllPress && (
        <TouchableOpacity
          onPress={onViewAllPress}
          style={styles.viewAllRow}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#E05638" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    lineHeight: 24,
    color: '#1E1B18',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: '#E05638',
    marginRight: 2,
  },
});
