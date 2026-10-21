import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Star, Heart, X, Briefcase, MapPin, Building2, Ruler, BadgeCheck } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { fontFamilies } from '../../../theme/typography';
import { couple1Asset, couple2Asset, couple3Asset } from '../../../assets';

interface DailyPickProfile {
  id: string;
  name: string;
  age: number;
  matchScore: string;
  profession: string;
  location: string;
  caste: string;
  specs: string;
  tags: string[];
  image: any;
}

const mockDailyPicks: DailyPickProfile[] = [
  {
    id: 'dp1',
    name: 'Prajakta',
    age: 25,
    matchScore: '94% Match',
    profession: 'Software Engineer',
    location: 'Pune, Maharashtra',
    caste: 'Maratha',
    specs: "5'4\" • Hindu",
    tags: ['🎵 Music', '✈️ Travel', '🍕 Foodie'],
    image: couple1Asset,
  },
  {
    id: 'dp2',
    name: 'Sanjana',
    age: 24,
    matchScore: '91% Match',
    profession: 'UX Designer',
    location: 'Mumbai, Maharashtra',
    caste: 'Deshastha',
    specs: "5'3\" • Hindu",
    tags: ['🎨 Art', '☕ Coffee', '📚 Books'],
    image: couple2Asset,
  },
  {
    id: 'dp3',
    name: 'Radhika',
    age: 26,
    matchScore: '95% Match',
    profession: 'Architect',
    location: 'Nagpur, Maharashtra',
    caste: '96 Kuli',
    specs: "5'5\" • Hindu",
    tags: ['🌿 Nature', '📸 Photo', '🧘 Yoga'],
    image: couple3Asset,
  },
  {
    id: 'dp4',
    name: 'Tanvi',
    age: 25,
    matchScore: '92% Match',
    profession: 'Data Scientist',
    location: 'Nashik, Maharashtra',
    caste: 'Kokanastha',
    specs: "5'4\" • Hindu",
    tags: ['💻 Tech', '🏔️ Trek', '🍿 Movies'],
    image: couple1Asset,
  },
  {
    id: 'dp5',
    name: 'Ananya',
    age: 23,
    matchScore: '89% Match',
    profession: 'Product Manager',
    location: 'Thane, Maharashtra',
    caste: 'Maratha',
    specs: "5'2\" • Hindu",
    tags: ['✈️ Travel', '🍜 Food', '🎵 Music'],
    image: couple2Asset,
  },
];

export const DailyPicksSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const [activeDot, setActiveDot] = useState(0);

  // Card width is 82% of screen width so the next card peeks visibly on the right edge
  const cardWidth = width * 0.82;
  const cardMarginRight = 12;
  const snapToInterval = cardWidth + cardMarginRight;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / snapToInterval);
    if (index >= 0 && index < mockDailyPicks.length) {
      setActiveDot(index);
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        icon={<Star size={20} color="#E05638" fill="#E05638" />}
        title="Daily Picks"
        onViewAllPress={() => {}}
      />

      {/* Horizontal Snap Slider with Next Card Peek */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapToInterval}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {mockDailyPicks.map((profile) => (
          <View
            key={profile.id}
            style={[styles.card, { width: cardWidth, marginRight: cardMarginRight }]}
          >
            {/* Left Side: Photo Container */}
            <View style={styles.photoContainer}>
              <Image
                source={profile.image}
                style={styles.photo}
                resizeMode="cover"
              />

              {/* Top-Left Match Badge */}
              <View style={styles.matchBadge}>
                <Heart size={10} color="#E05638" fill="#E05638" style={{ marginRight: 3 }} />
                <Text style={styles.matchBadgeText}>{profile.matchScore}</Text>
              </View>
            </View>

            {/* Right Side: Compact Details */}
            <View style={styles.detailsContainer}>
              {/* Name & Verified Badge */}
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
                <BadgeCheck size={16} color="#E05638" style={{ marginLeft: 4 }} />
              </View>

              {/* Online Status Indicator */}
              <View style={styles.onlineRow}>
                <View style={styles.greenDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>

              {/* Info Items List */}
              <View style={styles.infoList}>
                <View style={styles.infoRow}>
                  <Briefcase size={12} color="#8E8A85" style={styles.infoIcon} />
                  <Text style={styles.infoText} numberOfLines={1}>{profile.profession}</Text>
                </View>

                <View style={styles.infoRow}>
                  <MapPin size={12} color="#8E8A85" style={styles.infoIcon} />
                  <Text style={styles.infoText} numberOfLines={1}>{profile.location}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Building2 size={12} color="#8E8A85" style={styles.infoIcon} />
                  <Text style={styles.infoText} numberOfLines={1}>{profile.caste}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ruler size={12} color="#8E8A85" style={styles.infoIcon} />
                  <Text style={styles.infoText} numberOfLines={1}>{profile.specs}</Text>
                </View>
              </View>

              {/* Tag Pills */}
              <View style={styles.tagsRow}>
                {profile.tags.map((tag, idx) => (
                  <View key={`tag-${idx}`} style={styles.tagPill}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons Row */}
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionPass} activeOpacity={0.8}>
                  <X size={16} color="#3A3532" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionLike} activeOpacity={0.8}>
                  <Heart size={16} color="#E05638" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionSuperLike} activeOpacity={0.8}>
                  <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationRow}>
        {mockDailyPicks.map((_, i) => (
          <View
            key={`pick-dot-${i}`}
            style={[
              styles.dot,
              i === activeDot ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 4,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 195, // Compact constrained height
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE6E1',
  },
  photoContainer: {
    width: '42%',
    backgroundColor: '#F7EFEA',
    position: 'relative',
    height: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  matchBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 9,
    color: '#E05638',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    lineHeight: 18,
    color: '#1E1B18',
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
    marginRight: 4,
  },
  onlineText: {
    fontFamily: fontFamilies.medium,
    fontSize: 10,
    color: '#6C635F',
  },
  infoList: {
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#6C635F',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
  },
  tagPill: {
    backgroundColor: '#FDF0EB',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 3,
    marginBottom: 2,
  },
  tagText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    color: '#C43E23',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  actionPass: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7EFEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLike: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FDF0EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6E1',
  },
  actionSuperLike: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E05638',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  dotActive: {
    width: 14,
    backgroundColor: '#E05638',
  },
  dotInactive: {
    width: 6,
    backgroundColor: '#D1C7C1',
  },
});
