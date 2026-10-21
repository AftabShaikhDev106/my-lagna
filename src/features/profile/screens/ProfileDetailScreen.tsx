import React, { useState } from 'react';
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
  Bell,
  CheckCircle2,
  Briefcase,
  MapPin,
  Building2,
  Ruler,
  GraduationCap,
  Heart,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Star,
  MessageSquare,
  MoreVertical,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { DISCOVER_PROFILES, DiscoverProfile } from '../../discover/data/discoverProfilesData';
import { MOCK_PROFILES } from '../../../services/mock/mockProfiles';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ProfileDetail'>;

export const ProfileDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const screenMode = route.params?.mode || 'discover';

  // Find target profile from discover profiles or fallback mock profiles
  const profileId = route.params?.profileId;
  const discoverMatch = DISCOVER_PROFILES.find((p) => p.id === profileId);
  const mockMatch = MOCK_PROFILES.find((p) => p.id === profileId);

  const profile: DiscoverProfile = discoverMatch || {
    id: mockMatch?.id || 'disc_1',
    name: mockMatch?.name.split(' ')[0] || 'Prajakta',
    age: mockMatch?.age || 25,
    isVerified: mockMatch?.isVerified ?? true,
    matchScore: mockMatch?.matchScore || 94,
    profession: mockMatch?.profession || 'Software Engineer',
    location: mockMatch?.location || 'Pune, Maharashtra',
    community: mockMatch?.caste || 'Maratha',
    heightReligion: `${mockMatch?.height || "5'4\""} • ${mockMatch?.religion || 'Hindu'}`,
    tags: ['🎵 Music', '✈ Travel', '🍴 Foodie'],
    about:
      mockMatch?.about ||
      'A cheerful, ambitious and family-oriented person\nI love traveling and exploring new places.',
    preferenceHighlight: 'Prefers partner from Pune or nearby',
    education: mockMatch?.education || 'B.E. in Computer Engineering',
    university: 'Savitribai Phule Pune University',
    occupationDetail: 'Working since 2021',
    lifestyle: 'Non-vegetarian',
    familyDetails: 'Parents • 1 Younger Brother',
    familyLocation: 'Living in Pune',
    photos: mockMatch?.photos && mockMatch.photos.length > 0
      ? mockMatch.photos
      : [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        ],
  };

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Accordion toggle states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    education: true,
    occupation: true,
    lifestyle: true,
    family: true,
  });

  // Action toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const showToast = (msg: string, delayGoBack = false) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      if (delayGoBack) {
        navigation.goBack();
      }
    }, 1500);
  };

  const MAX_THUMBNAILS = 4;
  const totalPhotos = profile.photos.length;
  const hasOverflow = totalPhotos > MAX_THUMBNAILS;
  const displayPhotos = profile.photos.slice(0, MAX_THUMBNAILS);
  const overflowCount = totalPhotos - 3; // photos remaining beyond slot 3

  const mainPhotoUrl = profile.photos[selectedPhotoIndex] || profile.photos[0];

  const handleMessagePress = () => {
    if (navigation.canGoBack() && screenMode === 'chat') {
      navigation.goBack();
    } else {
      navigation.navigate('ChatDetail', {
        conversationId: 'conv_101',
        profileId: profile.id,
      });
    }
  };

  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Navigation Bar Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={screenMode === 'chat' || screenMode === 'profile' ? styles.headerCleanBtn : styles.headerCircleBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <ArrowLeft size={22} color="#1E1E1E" />
        </TouchableOpacity>

        <View style={styles.headerTitleRow}>
          {screenMode === 'chat' || screenMode === 'profile' ? (
            <Text style={styles.headerTitleText}>Profile</Text>
          ) : (
            <>
              <Text style={styles.headerTitleText}>{profile.name}</Text>
              {profile.isVerified ? (
                <View style={styles.verifiedIconBadge}>
                  <CheckCircle2 size={18} color="#E05638" fill="#FFF4EE" />
                </View>
              ) : null}
            </>
          )}
        </View>

        <TouchableOpacity
          style={screenMode === 'chat' || screenMode === 'profile' ? styles.headerCleanBtn : styles.headerCircleBtn}
          onPress={() => {
            if (screenMode === 'discover') {
              navigation.navigate('HelpSupport');
            }
          }}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Options"
        >
          {screenMode === 'chat' || screenMode === 'profile' ? (
            <MoreVertical size={22} color="#8C4E2B" />
          ) : (
            <Bell size={20} color="#1E1E1E" />
          )}
        </TouchableOpacity>
      </View>

      {/* Main Content Scroll View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Profile Card Sheet */}
        <View style={[styles.mainCardSheet, { backgroundColor: theme.colors.surface }]}>
          {/* Photo Gallery Grid (Main Left + 4 Vertical Right Thumbnails) */}
          <View style={styles.galleryContainer}>
            {/* Left Column: Big Main Image */}
            <View style={styles.mainImageWrapper}>
              <Image
                source={{ uri: mainPhotoUrl }}
                style={styles.mainImage}
                resizeMode="cover"
              />

              {/* Top Left Floating Compatibility Badge */}
              <View style={styles.compatBadge}>
                <View style={styles.compatScoreRow}>
                  <Heart size={14} color="#E05638" fill="#E05638" style={{ marginRight: 4 }} />
                  <Text style={styles.compatScoreText}>{profile.matchScore}%</Text>
                </View>
                <Text style={styles.compatLabelText}>Compatible</Text>
              </View>
            </View>

            {/* Right Column: Vertical Thumbnails Aligned to Top */}
            <View style={styles.thumbnailColumn}>
              {displayPhotos.map((photoUrl, index) => {
                const isSelected = selectedPhotoIndex === index;
                const isFourthSlot = index === 3;
                const showOverlay = isFourthSlot && hasOverflow;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    onPress={() => setSelectedPhotoIndex(index)}
                    style={[
                      styles.thumbnailWrapper,
                      isSelected && styles.thumbnailSelected,
                    ]}
                  >
                    <Image
                      source={{ uri: photoUrl }}
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />

                    {/* 4th Thumbnail Overlay showing +03 if total photos > 4 */}
                    {showOverlay ? (
                      <View style={styles.overflowOverlay}>
                        <Text style={styles.overflowText}>
                          +{overflowCount < 10 ? `0${overflowCount}` : overflowCount}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Profile Basic Info Header */}
          <View style={styles.profileHeaderSection}>
            {/* Name, Age & Verified Checkmark */}
            <View style={styles.nameRow}>
              <Text style={[styles.nameText, { color: theme.colors.text }]}>
                {profile.name}, {profile.age}
              </Text>
              {profile.isVerified ? (
                <View style={styles.verifiedCircle}>
                  <CheckCircle2 size={22} color="#E05638" fill="#FFF4EE" />
                </View>
              ) : null}
            </View>

            {/* Grid of Attributes */}
            <View style={styles.attributesGrid}>
              <View style={styles.attributeItem}>
                <Briefcase size={16} color="#A88B7E" style={styles.attributeIcon} />
                <Text style={[styles.attributeText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {profile.profession}
                </Text>
              </View>

              <View style={styles.attributeItem}>
                <MapPin size={16} color="#A88B7E" style={styles.attributeIcon} />
                <Text style={[styles.attributeText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {profile.location}
                </Text>
              </View>

              <View style={styles.attributeItem}>
                <Building2 size={16} color="#A88B7E" style={styles.attributeIcon} />
                <Text style={[styles.attributeText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {profile.community}
                </Text>
              </View>

              <View style={styles.attributeItem}>
                <Ruler size={16} color="#A88B7E" style={styles.attributeIcon} />
                <Text style={[styles.attributeText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {profile.heightReligion}
                </Text>
              </View>
            </View>

            {/* Interest Tags Row */}
            <View style={styles.tagsRow}>
              {profile.tags.map((tag, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Separator Divider */}
            <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />

            {/* About Her Section */}
            <View style={styles.aboutSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About her</Text>
              <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
                {profile.about}
              </Text>
            </View>

            {/* Separator Divider */}
            <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />

            {/* Accordion Detail Sections */}
            <View style={styles.accordionContainer}>
              {/* 1. Education Accordion */}
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleSection('education')}
                >
                  <View style={styles.accordionIconCircle}>
                    <GraduationCap size={20} color="#8C4E2B" />
                  </View>
                  <View style={styles.accordionTitleWrapper}>
                    <Text style={[styles.accordionTitle, { color: theme.colors.text }]}>Education</Text>
                    <Text style={[styles.accordionSubtitle, { color: theme.colors.textSecondary }]}>
                      {profile.education || 'B.E. in Computer Engineering'}
                    </Text>
                    {profile.university ? (
                      <Text style={[styles.accordionDetail, { color: theme.colors.textMuted }]}>
                        {profile.university}
                      </Text>
                    ) : null}
                  </View>
                  {expandedSections.education ? (
                    <ChevronUp size={20} color="#8C4E2B" />
                  ) : (
                    <ChevronDown size={20} color="#8C4E2B" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.dividerLight, { backgroundColor: theme.colors.borderLight }]} />

              {/* 2. Occupation Accordion */}
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleSection('occupation')}
                >
                  <View style={styles.accordionIconCircle}>
                    <Briefcase size={20} color="#8C4E2B" />
                  </View>
                  <View style={styles.accordionTitleWrapper}>
                    <Text style={[styles.accordionTitle, { color: theme.colors.text }]}>Occupation</Text>
                    <Text style={[styles.accordionSubtitle, { color: theme.colors.textSecondary }]}>
                      {profile.profession}
                    </Text>
                    <Text style={[styles.accordionDetail, { color: theme.colors.textMuted }]}>
                      {profile.occupationDetail || 'Working since 2021'}
                    </Text>
                  </View>
                  {expandedSections.occupation ? (
                    <ChevronUp size={20} color="#8C4E2B" />
                  ) : (
                    <ChevronDown size={20} color="#8C4E2B" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.dividerLight, { backgroundColor: theme.colors.borderLight }]} />

              {/* 3. Lifestyle Accordion */}
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleSection('lifestyle')}
                >
                  <View style={styles.accordionIconCircle}>
                    <Heart size={20} color="#8C4E2B" />
                  </View>
                  <View style={styles.accordionTitleWrapper}>
                    <Text style={[styles.accordionTitle, { color: theme.colors.text }]}>Lifestyle</Text>
                    <Text style={[styles.accordionSubtitle, { color: theme.colors.textSecondary }]}>
                      {profile.lifestyle || 'Non-vegetarian'}
                    </Text>
                  </View>
                  {expandedSections.lifestyle ? (
                    <ChevronUp size={20} color="#8C4E2B" />
                  ) : (
                    <ChevronDown size={20} color="#8C4E2B" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.dividerLight, { backgroundColor: theme.colors.borderLight }]} />

              {/* 4. Family Details Accordion */}
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleSection('family')}
                >
                  <View style={styles.accordionIconCircle}>
                    <Users size={20} color="#8C4E2B" />
                  </View>
                  <View style={styles.accordionTitleWrapper}>
                    <Text style={[styles.accordionTitle, { color: theme.colors.text }]}>Family Details</Text>
                    <Text style={[styles.accordionSubtitle, { color: theme.colors.textSecondary }]}>
                      {profile.familyDetails || 'Parents • 1 Younger Brother'}
                    </Text>
                    <Text style={[styles.accordionDetail, { color: theme.colors.textMuted }]}>
                      {profile.familyLocation || 'Living in Pune'}
                    </Text>
                  </View>
                  {expandedSections.family ? (
                    <ChevronUp size={20} color="#8C4E2B" />
                  ) : (
                    <ChevronDown size={20} color="#8C4E2B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Interactive Toast Feedback Banner */}
      {toastMessage ? (
        <View style={styles.toastBanner}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      ) : null}

      {/* Floating Bottom Action Bar */}
      <View style={styles.floatingActionBarWrapper}>
        {screenMode === 'chat' || screenMode === 'profile' ? (
          <TouchableOpacity
            style={styles.fullWidthMessageBtn}
            activeOpacity={0.85}
            onPress={handleMessagePress}
          >
            <MessageSquare size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.fullWidthMessageBtnText}>Message</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.floatingActionBar}>
            {/* Pass Button */}
            <TouchableOpacity
              style={styles.passBtn}
              activeOpacity={0.8}
              onPress={() => showToast(`Passed ${profile.name}`, true)}
            >
              <X size={16} color="#E53935" style={{ marginRight: 4 }} />
              <Text style={styles.passBtnText} numberOfLines={1}>Pass</Text>
            </TouchableOpacity>

            {/* Send Interest Button (Primary Vibrant Orange) */}
            <TouchableOpacity
              style={styles.sendInterestBtn}
              activeOpacity={0.85}
              onPress={() => showToast(`Interest sent to ${profile.name}! 💕`, true)}
            >
              <Heart size={16} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.sendInterestBtnText} numberOfLines={1}>Send Interest</Text>
            </TouchableOpacity>

            {/* Shortlist Button */}
            <TouchableOpacity
              style={styles.shortlistBtn}
              activeOpacity={0.8}
              onPress={() => showToast(`Added ${profile.name} to Shortlist ⭐`)}
            >
              <Star size={16} color="#F57C00" style={{ marginRight: 4 }} />
              <Text style={styles.shortlistBtnText} numberOfLines={1}>Shortlist</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: '#1E1E1E',
  },
  verifiedIconBadge: {
    marginLeft: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // space for floating bottom action bar
  },
  mainCardSheet: {
    width: '100%',
    borderRadius: 28,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  galleryContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 290,
    gap: 10,
    marginBottom: 20,
  },
  mainImageWrapper: {
    flex: 1,
    height: '100%',
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EFE6E1',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  compatBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compatScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatScoreText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#E05638',
  },
  compatLabelText: {
    fontFamily: fontFamilies.medium,
    fontSize: 10,
    color: '#E05638',
    marginTop: 1,
  },
  thumbnailColumn: {
    width: 64,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 8,
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EFE6E1',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: '#E05638',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  overflowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  profileHeaderSection: {
    paddingHorizontal: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    lineHeight: 32,
    marginRight: 8,
  },
  verifiedCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  attributeItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 4,
  },
  attributeIcon: {
    marginRight: 6,
  },
  attributeText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tagPill: {
    backgroundColor: '#FFF2EC',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE3D8',
  },
  tagText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: '#A8522E',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  dividerLight: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  aboutSection: {
    marginVertical: 4,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    marginBottom: 6,
  },
  aboutText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  accordionContainer: {
    marginTop: 4,
  },
  accordionItem: {
    paddingVertical: 4,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  accordionTitleWrapper: {
    flex: 1,
  },
  accordionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    marginBottom: 2,
  },
  accordionSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
  },
  accordionDetail: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    marginTop: 1,
  },
  toastBanner: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: '#E05638',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    zIndex: 99,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  floatingActionBarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    alignItems: 'center',
    zIndex: 90,
  },
  floatingActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    gap: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  passBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  passBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#E53935',
  },
  sendInterestBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E05638',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 6,
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sendInterestBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  shortlistBtn: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFE0B2',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  shortlistBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#F57C00',
  },
  fullWidthMessageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E05638',
    borderRadius: 18,
    height: 52,
    width: '100%',
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  fullWidthMessageBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  headerCleanBtn: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

