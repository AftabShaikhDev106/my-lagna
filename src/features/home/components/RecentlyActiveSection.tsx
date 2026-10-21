import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Zap } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { fontFamilies } from '../../../theme/typography';
import { couple2Asset, couple3Asset, couple1Asset } from '../../../assets';

interface ActiveUser {
  id: string;
  name: string;
  image: any;
  isNew?: boolean;
}

const activeUsers: ActiveUser[] = [
  { id: '1', name: 'Shruti', image: couple2Asset, isNew: true },
  { id: '2', name: 'Rutuja', image: couple3Asset },
  { id: '3', name: 'Sneha', image: couple1Asset },
  { id: '4', name: 'Aisha', image: couple2Asset },
  { id: '5', name: 'Isha', image: couple3Asset },
  { id: '6', name: 'Vaishnavi', image: couple1Asset },
];

export const RecentlyActiveSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionHeader
        icon={<Zap size={20} color="#E05638" fill="#E05638" />}
        title="Recently Active"
        onViewAllPress={() => {}}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.avatarItem}
            activeOpacity={0.8}
          >
            <View style={styles.avatarBorder}>
              <Image source={user.image} style={styles.avatarImage} resizeMode="cover" />

              {/* Online Green Dot */}
              <View style={styles.onlineBadge} />

              {/* NEW Badge if applicable */}
              {user.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>

            <Text style={styles.nameText} numberOfLines={1}>
              {user.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  avatarItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 68,
  },
  avatarBorder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    borderWidth: 2,
    borderColor: '#E05638',
    position: 'relative',
    marginBottom: 6,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  newBadge: {
    position: 'absolute',
    top: -4,
    left: -2,
    backgroundColor: '#E05638',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  newBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 8,
    color: '#FFFFFF',
  },
  nameText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: '#1E1B18',
    textAlign: 'center',
  },
});
