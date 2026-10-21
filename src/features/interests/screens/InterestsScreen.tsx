import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
} from 'lucide-react-native';
import { MainTabParamList, AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { InterestSubTabPill, SubTabType } from '../components/InterestSubTabPill';
import { InterestCard } from '../components/InterestCard';
import { MOCK_INTERESTS_DATA, InterestProfileItem } from '../data/mockInterestsData';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Interests'>,
  NativeStackScreenProps<AppStackParamList>
>;

export const InterestsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  // Active sub-tab state ('received' | 'sent' | 'accepted' | 'shortlisted')
  const [activeTab, setActiveTab] = useState<SubTabType>('received');

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive items state list
  const [items, setItems] = useState<InterestProfileItem[]>(MOCK_INTERESTS_DATA);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Tab counters calculation
  const counts = {
    received: items.filter((i) => i.tabCategory === 'received').length,
    sent: items.filter((i) => i.tabCategory === 'sent').length,
    accepted: items.filter((i) => i.tabCategory === 'accepted').length,
    shortlisted: items.filter((i) => i.tabCategory === 'shortlisted').length,
  };

  // Filtered items for current tab & search query
  const currentTabItems = items.filter(
    (i) =>
      i.tabCategory === activeTab &&
      (i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.profession.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleAccept = (item: InterestProfileItem) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, tabCategory: 'accepted' as const } : i,
      ),
    );
    showToast(`Accepted interest from ${item.name}! 🎉`);
  };

  const handleDecline = (item: InterestProfileItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Declined interest`);
  };

  const handleMessage = (item: InterestProfileItem) => {
    navigation.navigate('ChatDetail', {
      conversationId: `conv_${item.id}`,
      profileId: item.id,
    });
  };

  const handleShortlistToggle = (item: InterestProfileItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Removed ${item.name} from Shortlist`);
  };

  const getSectionHeaderContent = () => {
    switch (activeTab) {
      case 'received':
        return {
          title: 'Received Interests',
          subtitle: 'People who are interested in you',
        };
      case 'sent':
        return {
          title: 'Sent Interests',
          subtitle: 'People you have shown interest in',
        };
      case 'accepted':
        return {
          title: 'Accepted Interests',
          subtitle: 'You both liked each other! Start a conversation',
        };
      case 'shortlisted':
        return {
          title: 'Shortlisted Profiles',
          subtitle: 'People you saved for later',
        };
    }
  };

  const sectionContent = getSectionHeaderContent();

  return (
    <ScreenContainer paddingHorizontal={0}>
      <FlatList
        data={currentTabItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={
          <View>
            {/* Top Screen Header */}
            <View style={styles.screenHeader}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Interests{' '}
                <Text style={{ color: theme.colors.primary }}>♡</Text>
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                Let's find your perfect Marathi match
              </Text>
            </View>

            {/* Search Bar Input */}
            <View style={styles.searchSection}>
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
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <SlidersHorizontal size={18} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sub-Tab Pills ScrollView */}
            <View style={styles.subTabsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.subTabsScrollContent}
              >
                <InterestSubTabPill
                  type="received"
                  label="Received"
                  count={counts.received}
                  isActive={activeTab === 'received'}
                  onPress={() => setActiveTab('received')}
                />
                <InterestSubTabPill
                  type="sent"
                  label="Sent"
                  count={counts.sent}
                  isActive={activeTab === 'sent'}
                  onPress={() => setActiveTab('sent')}
                />
                <InterestSubTabPill
                  type="accepted"
                  label="Accepted"
                  count={counts.accepted}
                  isActive={activeTab === 'accepted'}
                  onPress={() => setActiveTab('accepted')}
                />
                <InterestSubTabPill
                  type="shortlisted"
                  label="Shortlisted"
                  count={counts.shortlisted}
                  isActive={activeTab === 'shortlisted'}
                  onPress={() => setActiveTab('shortlisted')}
                />
              </ScrollView>
            </View>

            {/* Toast Notification Banner */}
            {toastMessage ? (
              <View style={[styles.toastBanner, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.toastText}>{toastMessage}</Text>
              </View>
            ) : null}

            {/* Section Heading & Sort Row */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleGroup}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  {sectionContent.title}
                </Text>
                <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
                  {sectionContent.subtitle}
                </Text>
              </View>

              {/* Sort Dropdown button */}
              <TouchableOpacity style={styles.sortDropdownBtn} activeOpacity={0.7}>
                <Text style={[styles.sortBtnText, { color: theme.colors.textSecondary }]}>
                  Newest
                </Text>
                <ChevronDown size={14} color={theme.colors.textSecondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardPaddingWrapper}>
            <InterestCard
              item={item}
              onPressProfile={() =>
                navigation.navigate('ProfileDetail', { profileId: item.id })
              }
              onAccept={() => handleAccept(item)}
              onDecline={() => handleDecline(item)}
              onMessage={() => handleMessage(item)}
              onShortlistToggle={() => handleShortlistToggle(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyStateContainer,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.emptyIconCircle,
                { backgroundColor: theme.colors.primarySoft },
              ]}
            >
              <Sparkles size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No {sectionContent.title} Found
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
              There are no profiles in this category right now.
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 32,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
  subTabsContainer: {
    marginBottom: 20,
  },
  subTabsScrollContent: {
    paddingHorizontal: 20,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleGroup: {
    flex: 1,
    paddingRight: 12,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    lineHeight: 26,
  },
  sectionSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  sortDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sortBtnText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
  },
  cardPaddingWrapper: {
    paddingHorizontal: 20,
  },
  emptyStateContainer: {
    marginHorizontal: 20,
    padding: 32,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});
