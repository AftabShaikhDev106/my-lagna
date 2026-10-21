import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Bookmark, BadgeCheck, Briefcase, MapPin } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { fontFamilies } from '../../../theme/typography';
import { couple3Asset, couple1Asset } from '../../../assets';

interface MatchItem {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  matchScore: string;
  image: any;
}

const compatibleMatches: MatchItem[] = [
  {
    id: '1',
    name: 'Akshita',
    age: 26,
    profession: 'Chartered Accountant',
    location: 'Mumbai, Maharashtra',
    matchScore: '94% Match',
    image: couple3Asset,
  },
  {
    id: '2',
    name: 'Pooja',
    age: 24,
    profession: 'Chartered Accountant',
    location: 'Mumbai, Maharashtra',
    matchScore: '94% Match',
    image: couple1Asset,
  },
];

export const CompatibleMatchesSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionHeader
        icon={<Heart size={20} color="#E05638" fill="#E05638" />}
        title="Compatible Matches"
        onViewAllPress={() => {}}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {compatibleMatches.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
          >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

            <View style={styles.cardDetails}>
              <View style={styles.topRow}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{item.name}, {item.age}</Text>
                  <BadgeCheck size={14} color="#E05638" style={{ marginLeft: 4 }} />
                </View>

                <TouchableOpacity activeOpacity={0.7}>
                  <Bookmark size={14} color="#8E8A85" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Briefcase size={11} color="#8E8A85" style={{ marginRight: 4 }} />
                <Text style={styles.infoText} numberOfLines={1}>{item.profession}</Text>
              </View>

              <View style={styles.infoRow}>
                <MapPin size={11} color="#8E8A85" style={{ marginRight: 4 }} />
                <Text style={styles.infoText} numberOfLines={1}>{item.location}</Text>
              </View>

              <View style={styles.matchPill}>
                <Heart size={10} color="#E05638" fill="#E05638" style={{ marginRight: 3 }} />
                <Text style={styles.matchText}>{item.matchScore}</Text>
              </View>
            </View>
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
  card: {
    flexDirection: 'row',
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE6E1',
  },
  cardImage: {
    width: 64,
    height: 72,
    borderRadius: 12,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1B18',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#6C635F',
    flex: 1,
  },
  matchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF0EB',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  matchText: {
    fontFamily: fontFamilies.bold,
    fontSize: 9,
    color: '#E05638',
  },
});
