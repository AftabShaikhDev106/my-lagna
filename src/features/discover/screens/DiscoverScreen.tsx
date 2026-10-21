import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Search,
  SlidersHorizontal,
  Bell,
  Sparkles,
  RotateCcw,
} from 'lucide-react-native';
import { MainTabParamList, AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { SwipeableProfileCard } from '../components/SwipeableProfileCard';
import { DISCOVER_PROFILES, DiscoverProfile } from '../data/discoverProfilesData';
import { AppButton } from '../../../components/buttons/AppButton';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Discover'>,
  NativeStackScreenProps<AppStackParamList>
>;

export const DiscoverScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  // Search filter string
  const [searchQuery, setSearchQuery] = useState('');

  // Active stack index (0, 1, 2, ...)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Status feedback toast banner message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProfiles = DISCOVER_PROFILES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeProfile = filteredProfiles[currentIndex];
  const nextProfile = filteredProfiles[currentIndex + 1];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleSwipeRight = (profile: DiscoverProfile) => {
    showToast(`Interest Sent to ${profile.name}! 💕`);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeLeft = (profile: DiscoverProfile) => {
    showToast(`Passed ${profile.name}`);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeDown = (profile: DiscoverProfile) => {
    showToast(`Added ${profile.name} to Wishlist ⭐`);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setSearchQuery('');
  };

  return (
    <ScreenContainer paddingHorizontal={0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Discover
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Find your perfect match <Text style={{ color: theme.colors.primary }}>♡</Text>
            </Text>
          </View>

          {/* Top Right Header Action Buttons */}
          <View style={styles.headerRightButtons}>
            {/* Filter Button */}
            <TouchableOpacity
              style={[
                styles.iconBtnCircle,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Filter Options"
            >
              <SlidersHorizontal size={20} color={theme.colors.text} />
            </TouchableOpacity>

            {/* Notification Bell Button */}
            <TouchableOpacity
              style={[
                styles.iconBtnCircle,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => navigation.navigate('HelpSupport')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <Bell size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputWrapper,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Search size={18} color={theme.colors.textSecondary} style={{ marginRight: 10 }} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search by name, city or community"
              placeholderTextColor={theme.colors.textMuted}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setCurrentIndex(0);
              }}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <SlidersHorizontal size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Interactive Toast Notification */}
        {toastMessage ? (
          <View style={[styles.toastBanner, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        ) : null}

        {/* Profile Card Deck Section */}
        <View style={styles.deckContainer}>
          {activeProfile ? (
            <View style={styles.stackWrapper}>
              {/* Next Card Preview Underneath */}
              {nextProfile ? (
                <View style={styles.underCardPreview}>
                  <SwipeableProfileCard
                    profile={nextProfile}
                    isTopCard={false}
                    onSwipeLeft={() => {}}
                    onSwipeRight={() => {}}
                    onSwipeDown={() => {}}
                  />
                </View>
              ) : null}

              {/* Active Top Interactive Card */}
              <SwipeableProfileCard
                profile={activeProfile}
                isTopCard={true}
                onSwipeLeft={() => handleSwipeLeft(activeProfile)}
                onSwipeRight={() => handleSwipeRight(activeProfile)}
                onSwipeDown={() => handleSwipeDown(activeProfile)}
                onPressProfile={() =>
                  navigation.navigate('ProfileDetail', { profileId: activeProfile.id })
                }
              />
            </View>
          ) : (
            /* Empty Deck State */
            <View
              style={[
                styles.emptyCard,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}
            >
              <View
                style={[
                  styles.emptyIconCircle,
                  { backgroundColor: theme.colors.primarySoft },
                ]}
              >
                <Sparkles size={36} color={theme.colors.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                No More Profiles Nearby
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
                You've explored all your top matches. Check back later or adjust your search filters.
              </Text>
              <AppButton
                title="Re-explore Matches"
                icon={<RotateCcw size={18} color="#FFFFFF" />}
                onPress={handleResetDeck}
                style={styles.resetBtn}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 2,
  },
  headerRightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    paddingVertical: 0,
  },
  toastBanner: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  toastText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  deckContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  stackWrapper: {
    width: '100%',
    position: 'relative',
  },
  underCardPreview: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  emptyCard: {
    width: '100%',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  resetBtn: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 24,
  },
});
