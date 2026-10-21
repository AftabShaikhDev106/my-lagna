import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Crown, BadgeCheck } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { fontFamilies } from '../../../theme/typography';
import { couple2Asset, couple3Asset, couple1Asset } from '../../../assets';

interface PremiumMember {
  id: string;
  name: string;
  age: number;
  profession: string;
  city: string;
  image: any;
}

const premiumMembers: PremiumMember[] = [
  { id: '1', name: 'Neha', age: 26, profession: 'Doctor', city: 'Pune', image: couple2Asset },
  { id: '2', name: 'Neha', age: 26, profession: 'Doctor', city: 'Pune', image: couple3Asset },
  { id: '3', name: 'Neha', age: 26, profession: 'Doctor', city: 'Pune', image: couple1Asset },
  { id: '4', name: 'Neha', age: 26, profession: 'Doctor', city: 'Pune', image: couple2Asset },
  { id: '5', name: 'Neha', age: 26, profession: 'Doctor', city: 'Pune', image: couple3Asset },
];

export const PremiumMembersSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionHeader
        icon={<Crown size={20} color="#E05638" fill="#E05638" />}
        title="Premium Members"
        onViewAllPress={() => {}}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {premiumMembers.map((item, index) => (
          <TouchableOpacity
            key={`prem-${index}`}
            style={styles.card}
            activeOpacity={0.85}
          >
            {/* Thumbnail Photo Container */}
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

              {/* Crown Icon Badge */}
              <View style={styles.crownBadge}>
                <Crown size={11} color="#E05638" fill="#E05638" />
              </View>
            </View>

            {/* Content Below */}
            <View style={styles.cardContent}>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{item.name}, {item.age}</Text>
                <BadgeCheck size={13} color="#E05638" style={{ marginLeft: 3 }} />
              </View>

              <Text style={styles.professionText}>{item.profession}</Text>
              <Text style={styles.cityText}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 105,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
    marginRight: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE6E1',
  },
  imageContainer: {
    width: '100%',
    height: 96,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  crownBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#1E1B18',
  },
  professionText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#6C635F',
    marginTop: 1,
  },
  cityText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#9E948F',
  },
});
