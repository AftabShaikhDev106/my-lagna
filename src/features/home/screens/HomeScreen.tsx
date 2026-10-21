import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSearchBar } from '../components/HomeSearchBar';
import { DailyPicksSection } from '../components/DailyPicksSection';
import { RecentlyActiveSection } from '../components/RecentlyActiveSection';
import { CompatibleMatchesSection } from '../components/CompatibleMatchesSection';
import { PremiumMembersSection } from '../components/PremiumMembersSection';
import { HomeBottomPoster } from '../components/HomeBottomPoster';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenContainer paddingHorizontal={0}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Greeting and Action Buttons */}
        <HomeHeader
          userName="Aftab"
          onNotificationPress={() => navigation.navigate('Notifications')}
          onProfilePress={() => navigation.navigate('ProfileDetail', { profileId: 'me' })}
        />

        {/* Search Bar with Filter Button */}
        <HomeSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => {}}
        />

        {/* Daily Picks Featured Section */}
        <DailyPicksSection />

        {/* Recently Active Avatars Section */}
        <RecentlyActiveSection />

        {/* Compatible Matches Section */}
        <CompatibleMatchesSection />

        {/* Premium Members Section */}
        <PremiumMembersSection />

        {/* Home Bottom Poster Banner */}
        <HomeBottomPoster />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 110, // Generous padding so content isn't covered by floating bottom tab bar
  },
});
