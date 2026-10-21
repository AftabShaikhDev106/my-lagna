import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  HelpCircle,
  Eye,
  Crown,
  CheckCircle2,
  MoreVertical,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ProfileVisitors'>;

interface VisitorItem {
  id: string;
  name: string;
  age: number;
  location: string;
  matchScore: number;
  viewedTime: string;
  photoUrl: string;
  isVerified: boolean;
  profileId: string;
}

const TODAY_VISITORS: VisitorItem[] = [
  {
    id: 'vis_1',
    name: 'Akshata Patil',
    age: 25,
    location: 'Mumbai, Maharashtra',
    matchScore: 89,
    viewedTime: 'Viewed 2h ago',
    photoUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    profileId: 'disc_1',
  },
  {
    id: 'vis_2',
    name: 'Sneha Deshmukh',
    age: 24,
    location: 'Pune, Maharashtra',
    matchScore: 92,
    viewedTime: 'Viewed 1 hour ago',
    photoUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    profileId: 'disc_2',
  },
  {
    id: 'vis_3',
    name: 'Rutuja More',
    age: 26,
    location: 'Nashik, Maharashtra',
    matchScore: 86,
    viewedTime: 'Viewed 3 hours ago',
    photoUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    profileId: 'disc_3',
  },
];

const YESTERDAY_VISITORS: VisitorItem[] = [
  {
    id: 'vis_4',
    name: 'Prajakta Jadhav',
    age: 27,
    location: 'Kolhapur, Maharashtra',
    matchScore: 94,
    viewedTime: 'Viewed yesterday, 5:30 PM',
    photoUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    profileId: 'disc_4',
  },
  {
    id: 'vis_5',
    name: 'Neha Shinde',
    age: 26,
    location: 'Aurangabad, Maharashtra',
    matchScore: 91,
    viewedTime: 'Viewed 2 days ago, 9:15 AM',
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    profileId: 'disc_1',
  },
];

export const ProfileVisitorsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Navigation Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerCircleBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <ArrowLeft size={20} color="#1E1E1E" />
        </TouchableOpacity>

        <Text style={styles.headerTitleText}>Profile Visitors</Text>

        <TouchableOpacity
          style={styles.headerCircleBtn}
          onPress={() => navigation.navigate('HelpSupport')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Help Info"
        >
          <HelpCircle size={20} color="#1E1E1E" />
        </TouchableOpacity>
      </View>

      {/* Main Content Scroll View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner 1: Visitors Count Status */}
        <View style={styles.infoBannerCard}>
          <View style={styles.bannerIconCircle}>
            <Eye size={20} color="#E05638" />
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerTitle}>
              <Text style={{ color: '#E05638', fontFamily: fontFamilies.bold }}>12 People</Text> viewed your profile
            </Text>
            <Text style={styles.bannerSubtitle}>
              These people showed interest in knowing you.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.howItWorksBtn}
            onPress={() => navigation.navigate('HelpSupport')}
            activeOpacity={0.8}
          >
            <Text style={styles.howItWorksText}>How it works ⓘ</Text>
          </TouchableOpacity>
        </View>

        {/* Banner 2: Upgrade Promotion Card */}
        <View style={styles.upgradeBannerCard}>
          <View style={styles.crownIconCircle}>
            <Crown size={20} color="#E05638" fill="#FFF2EC" />
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.upgradeTitle}>See everyone who viewed you</Text>
            <Text style={styles.upgradeSubtitle}>
              Upgrade to Premium to see full list of visitors and more benefits.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => navigation.navigate('Premium')}
            activeOpacity={0.85}
          >
            <Text style={styles.upgradeBtnText}>Upgrade now 👑</Text>
          </TouchableOpacity>
        </View>

        {/* Today Visitors List Section */}
        <Text style={styles.sectionHeaderTitle}>Today</Text>
        <View style={styles.visitorsCardContainer}>
          {TODAY_VISITORS.map((visitor, idx) => (
            <React.Fragment key={visitor.id}>
              {idx > 0 ? <View style={styles.divider} /> : null}
              <View style={styles.visitorRow}>
                {/* Avatar with Online Green Dot */}
                <View style={styles.avatarWrapper}>
                  <Image source={{ uri: visitor.photoUrl }} style={styles.avatarImage} />
                  <View style={styles.onlineBadge} />
                </View>

                {/* Visitor Info */}
                <View style={styles.visitorDetails}>
                  <View style={styles.visitorNameRow}>
                    <Text style={styles.visitorNameText} numberOfLines={1}>
                      {visitor.name}
                    </Text>
                    {visitor.isVerified ? (
                      <CheckCircle2 size={16} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
                    ) : null}
                  </View>
                  <Text style={styles.visitorSubtitleText}>
                    {visitor.age} • {visitor.location}
                  </Text>
                  <View style={styles.matchBadgeRow}>
                    <View style={styles.matchPill}>
                      <Text style={styles.matchPillText}>🚩 {visitor.matchScore}% Match</Text>
                    </View>
                  </View>
                  <Text style={styles.viewedTimeText}>{visitor.viewedTime}</Text>
                </View>

                {/* Right Action: View Profile Button + 3-dots */}
                <View style={styles.visitorRightActions}>
                  <TouchableOpacity
                    style={styles.viewProfileBtn}
                    onPress={() => navigation.navigate('ProfileDetail', { profileId: visitor.profileId })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewProfileBtnText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreOptionsBtn} activeOpacity={0.7}>
                    <MoreVertical size={18} color="#888888" />
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Yesterday Visitors List Section */}
        <Text style={styles.sectionHeaderTitle}>Yesterday</Text>
        <View style={styles.visitorsCardContainer}>
          {YESTERDAY_VISITORS.map((visitor, idx) => (
            <React.Fragment key={visitor.id}>
              {idx > 0 ? <View style={styles.divider} /> : null}
              <View style={styles.visitorRow}>
                {/* Avatar with Online Green Dot */}
                <View style={styles.avatarWrapper}>
                  <Image source={{ uri: visitor.photoUrl }} style={styles.avatarImage} />
                  <View style={styles.onlineBadge} />
                </View>

                {/* Visitor Info */}
                <View style={styles.visitorDetails}>
                  <View style={styles.visitorNameRow}>
                    <Text style={styles.visitorNameText} numberOfLines={1}>
                      {visitor.name}
                    </Text>
                    {visitor.isVerified ? (
                      <CheckCircle2 size={16} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
                    ) : null}
                  </View>
                  <Text style={styles.visitorSubtitleText}>
                    {visitor.age} • {visitor.location}
                  </Text>
                  <View style={styles.matchBadgeRow}>
                    <View style={styles.matchPill}>
                      <Text style={styles.matchPillText}>🚩 {visitor.matchScore}% Match</Text>
                    </View>
                  </View>
                  <Text style={styles.viewedTimeText}>{visitor.viewedTime}</Text>
                </View>

                {/* Right Action: View Profile Button + 3-dots */}
                <View style={styles.visitorRightActions}>
                  <TouchableOpacity
                    style={styles.viewProfileBtn}
                    onPress={() => navigation.navigate('ProfileDetail', { profileId: visitor.profileId })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewProfileBtnText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreOptionsBtn} activeOpacity={0.7}>
                    <MoreVertical size={18} color="#888888" />
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Bottom Locked Visitors Banner */}
        <View style={styles.lockedBannerCard}>
          <View style={styles.crownIconCircle}>
            <Crown size={22} color="#E05638" />
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.upgradeTitle}>11 more visitors</Text>
            <Text style={styles.upgradeSubtitle}>
              Upgrade to Premium to see everyone who visited your profile
            </Text>
          </View>
          <TouchableOpacity
            style={styles.unlockNowBtn}
            onPress={() => navigation.navigate('Premium')}
            activeOpacity={0.85}
          >
            <Text style={styles.unlockNowBtnText}>Unlock Now 👑</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFEFE6',
  },
  headerCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: '#1E1E1E',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  infoBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bannerTextWrapper: {
    flex: 1,
    paddingRight: 6,
  },
  bannerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
  },
  howItWorksBtn: {
    backgroundColor: '#FFF5EE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD6C2',
  },
  howItWorksText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#E05638',
  },
  upgradeBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFDEC9',
  },
  crownIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  upgradeTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#666666',
  },
  upgradeBtn: {
    backgroundColor: '#E05638',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  upgradeBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  sectionHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 17,
    color: '#1E1E1E',
    marginTop: 6,
    marginBottom: 10,
  },
  visitorsCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  visitorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  visitorDetails: {
    flex: 1,
    paddingRight: 6,
  },
  visitorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  visitorNameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
  },
  visitorSubtitleText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#777777',
    marginBottom: 4,
  },
  matchBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchPill: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  matchPillText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: '#E53935',
  },
  viewedTimeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#A0A0A0',
  },
  visitorRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFC4B0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 4,
  },
  viewProfileBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#E05638',
  },
  moreOptionsBtn: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E0D6',
    marginVertical: 4,
  },
  lockedBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 18,
    padding: 16,
    marginTop: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFDEC9',
  },
  unlockNowBtn: {
    backgroundColor: '#E05638',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  unlockNowBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
