import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Settings,
  Camera,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Eye,
  Star,
  Heart,
  ShieldCheck,
  Shield,
  Bell,
  Lock,
  Globe,
  Headphones,
  LogOut,
} from 'lucide-react-native';
import { MainTabParamList, AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { useAuthStore } from '../../../store/authStore';
import { fontFamilies } from '../../../theme/typography';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<AppStackParamList>
>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const profileName = user?.name || 'Aftab Shaikh';
  const avatarUrl =
    (user as { photos?: string[] })?.photos && (user as { photos?: string[] }).photos!.length > 0
      ? (user as { photos?: string[] }).photos![0]
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600';

  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity
          style={styles.settingsCircleBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <Settings size={20} color="#1E1E1E" />
        </TouchableOpacity>
      </View>

      {/* Main Content Scroll Container */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar & Basic Info Card */}
        <View style={styles.profileHeaderCard}>
          {/* Avatar Container with Camera Badge */}
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            <TouchableOpacity
              style={styles.cameraBadge}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.85}
            >
              <Camera size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Details Column */}
          <View style={styles.profileInfoDetails}>
            {/* Name & Verified Badge */}
            <View style={styles.nameRow}>
              <Text style={styles.nameText} numberOfLines={1}>
                {profileName}
              </Text>
              <CheckCircle2 size={18} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
            </View>

            {/* Attributes Subtitles */}
            <Text style={styles.subtitleText}>21 • Muslim • Never Married</Text>
            <Text style={styles.locationText}>📍 Pune, Maharashtra</Text>

            {/* Photo Verified Pill Badge */}
            <View style={styles.verifiedPill}>
              <CheckCircle2 size={12} color="#2E7D32" style={{ marginRight: 4 }} />
              <Text style={styles.verifiedPillText}>Photo Verified</Text>
            </View>
          </View>
        </View>

        {/* Profile Completion Progress Card */}
        <View style={styles.completionCard}>
          <View style={styles.completionTopRow}>
            {/* Circular Ring Score */}
            <View style={styles.progressRingCircle}>
              <Text style={styles.progressRingText}>92%</Text>
            </View>

            {/* Completion Description */}
            <View style={styles.completionTextWrapper}>
              <Text style={styles.completionTitle}>Profile Complete</Text>
              <Text style={styles.completionSubtitle}>
                Almost there! Complete your profile to get faster matches.
              </Text>
            </View>

            {/* View Process Button */}
            <TouchableOpacity
              style={styles.viewProcessBtn}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.8}
            >
              <Text style={styles.viewProcessText}>View Process ›</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Progress Fill Bar */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '92%' }]} />
          </View>
        </View>

        {/* Edit Profile Banner Button */}
        <TouchableOpacity
          style={styles.editProfileBannerBtn}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.85}
        >
          <View style={styles.editBannerContent}>
            <Edit3 size={18} color="#E05638" style={{ marginRight: 8 }} />
            <Text style={styles.editBannerText}>Edit Profile</Text>
          </View>
          <ChevronRight size={18} color="#E05638" />
        </TouchableOpacity>

        {/* 4 Stats Grid Cards Row */}
        <View style={styles.statsGridRow}>
          {/* Card 1: Profile Visitors */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('ProfileVisitors')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Eye size={18} color="#7B1FA2" />
            </View>
            <Text style={styles.statLabel}>Profile Visitors</Text>
            <Text style={[styles.statValue, { color: '#7B1FA2' }]}>12</Text>
            <Text style={styles.statSubtext}>20+ who visited</Text>
          </TouchableOpacity>

          {/* Card 2: Shortlisted You */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('Interests')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Star size={18} color="#F57C00" />
            </View>
            <Text style={styles.statLabel}>Shortlisted You</Text>
            <Text style={[styles.statValue, { color: '#F57C00' }]}>5</Text>
            <Text style={styles.statSubtext}>People who liked you</Text>
          </TouchableOpacity>

          {/* Card 3: Interests Sent */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('Interests')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconCircle, { backgroundColor: '#FFEBEE' }]}>
              <Heart size={18} color="#E53935" />
            </View>
            <Text style={styles.statLabel}>Interests Sent</Text>
            <Text style={[styles.statValue, { color: '#E53935' }]}>10</Text>
            <Text style={styles.statSubtext}>Your Sent List</Text>
          </TouchableOpacity>

          {/* Card 4: Verification */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('ProfileVerification')}
            activeOpacity={0.8}
          >
            <View style={[styles.statIconCircle, { backgroundColor: '#E3F2FD' }]}>
              <ShieldCheck size={18} color="#1E88E5" />
            </View>
            <Text style={styles.statLabel}>Verification</Text>
            <Text style={[styles.statValueText, { color: '#1E88E5' }]}>Verified</Text>
            <Text style={styles.statSubtext}>Aadhaar Verified</Text>
          </TouchableOpacity>
        </View>

        {/* Unlock Premium Benefits Card */}
        <View style={styles.premiumBannerCard}>
          <View style={styles.shieldIconCircle}>
            <Shield size={20} color="#E05638" fill="#FFF2EC" />
          </View>
          <View style={styles.premiumTextWrapper}>
            <Text style={styles.premiumTitle}>Unlock your premium benefits</Text>
            <Text style={styles.premiumSubtitle}>
              See who liked you, unlimited chats, read receipts and more.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.goPremiumBtn}
            onPress={() => navigation.navigate('Premium')}
            activeOpacity={0.85}
          >
            <Text style={styles.goPremiumBtnText}>Go Premium 👑</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings List Section */}
        <Text style={styles.accountSectionTitle}>Account</Text>
        <View style={styles.accountListCard}>
          {/* Notifications */}
          <TouchableOpacity
            style={styles.accountListItem}
            onPress={() => navigation.navigate('NotificationSettings')}
            activeOpacity={0.7}
          >
            <View style={[styles.accountItemIconCircle, { backgroundColor: '#FFF2EC' }]}>
              <Bell size={18} color="#E05638" />
            </View>
            <View style={styles.accountItemTextWrapper}>
              <Text style={styles.accountItemTitle}>Notifications</Text>
              <Text style={styles.accountItemSubtitle}>Manage your notifications</Text>
            </View>
            <ChevronRight size={18} color="#A0A0A0" />
          </TouchableOpacity>

          <View style={styles.listDivider} />

          {/* Privacy & Security */}
          <TouchableOpacity
            style={styles.accountListItem}
            onPress={() => navigation.navigate('PrivacySecurity')}
            activeOpacity={0.7}
          >
            <View style={[styles.accountItemIconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Lock size={18} color="#2E7D32" />
            </View>
            <View style={styles.accountItemTextWrapper}>
              <Text style={styles.accountItemTitle}>Privacy & Security</Text>
              <Text style={styles.accountItemSubtitle}>Control your privacy and data</Text>
            </View>
            <ChevronRight size={18} color="#A0A0A0" />
          </TouchableOpacity>

          <View style={styles.listDivider} />

          {/* Language */}
          <TouchableOpacity
            style={styles.accountListItem}
            onPress={() => navigation.navigate('Language')}
            activeOpacity={0.7}
          >
            <View style={[styles.accountItemIconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Globe size={18} color="#7B1FA2" />
            </View>
            <View style={styles.accountItemTextWrapper}>
              <Text style={styles.accountItemTitle}>Language</Text>
              <Text style={styles.accountItemSubtitle}>Manage your notifications</Text>
            </View>
            <Text style={styles.languageValueText}>English</Text>
            <ChevronRight size={18} color="#A0A0A0" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <View style={styles.listDivider} />

          {/* Help & Support */}
          <TouchableOpacity
            style={styles.accountListItem}
            onPress={() => navigation.navigate('HelpSupport')}
            activeOpacity={0.7}
          >
            <View style={[styles.accountItemIconCircle, { backgroundColor: '#FFE0B2' }]}>
              <Headphones size={18} color="#F57C00" />
            </View>
            <View style={styles.accountItemTextWrapper}>
              <Text style={styles.accountItemTitle}>Help & Support</Text>
              <Text style={styles.accountItemSubtitle}>Get help and contact support</Text>
            </View>
            <ChevronRight size={18} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtnCard} onPress={logout} activeOpacity={0.8}>
          <LogOut size={18} color="#E53935" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    color: '#1E1E1E',
  },
  settingsCircleBtn: {
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EFE6E1',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E05638',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfoDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: '#1E1E1E',
  },
  subtitleText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  locationText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  verifiedPillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#2E7D32',
  },
  completionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  completionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressRingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3.5,
    borderColor: '#E05638',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressRingText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#E05638',
  },
  completionTextWrapper: {
    flex: 1,
    paddingRight: 6,
  },
  completionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  completionSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    lineHeight: 15,
  },
  viewProcessBtn: {
    backgroundColor: '#FFF5EE',
    borderWidth: 1,
    borderColor: '#FFD6C2',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  viewProcessText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#E05638',
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#F0E0D6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E05638',
    borderRadius: 3,
  },
  editProfileBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF5EE',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFDEC9',
  },
  editBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBannerText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#E05638',
  },
  statsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 10,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 2,
  },
  statValue: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    marginBottom: 1,
  },
  statValueText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    marginBottom: 1,
  },
  statSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 9,
    color: '#888888',
    textAlign: 'center',
  },
  premiumBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFDEC9',
  },
  shieldIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  premiumTextWrapper: {
    flex: 1,
    paddingRight: 6,
  },
  premiumTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#666666',
    lineHeight: 15,
  },
  goPremiumBtn: {
    backgroundColor: '#E05638',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  goPremiumBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  accountSectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: '#1E1E1E',
    marginBottom: 12,
  },
  accountListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  accountListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  accountItemIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountItemTextWrapper: {
    flex: 1,
  },
  accountItemTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  accountItemSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#888888',
  },
  languageValueText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: '#888888',
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F0E0D6',
  },
  logoutBtnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    marginBottom: 20,
  },
  logoutText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#E53935',
  },
});
