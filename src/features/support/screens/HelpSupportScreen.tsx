import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Search,
  User,
  Heart,
  MessageSquare,
  Crown,
  Settings,
  Headphones,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { supportQuestionAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'HelpSupport'>;

interface TopicItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  iconBg: string;
  iconColor: string;
  targetScreen?: keyof AppStackParamList;
}

const HELP_TOPICS: TopicItem[] = [
  {
    id: 'account',
    title: 'Account & Profile',
    subtitle: 'Manage your account, profile, photo and verification.',
    icon: User,
    iconBg: '#FFEFE6',
    iconColor: '#E05638',
    targetScreen: 'EditProfile',
  },
  {
    id: 'matches',
    title: 'Matches & Interests',
    subtitle: 'Learn about sending interests, matches and more.',
    icon: Heart,
    iconBg: '#FFF0F0',
    iconColor: '#E05638',
  },
  {
    id: 'chats',
    title: 'Chats & Messages',
    subtitle: 'Get help with messaging, chat features and media.',
    icon: MessageSquare,
    iconBg: '#FFEFE6',
    iconColor: '#E05638',
  },
  {
    id: 'premium',
    title: 'Premium & Payments',
    subtitle: 'Information about My Lagna Premium and payments.',
    icon: Crown,
    iconBg: '#FFF0F0',
    iconColor: '#E05638',
    targetScreen: 'Premium',
  },
  {
    id: 'safety',
    title: 'Safety & Privacy',
    subtitle: 'Tips for a safe experience and your privacy.',
    icon: Shield,
    iconBg: '#FFEFE6',
    iconColor: '#E05638',
    targetScreen: 'PrivacySecurity',
  },
  {
    id: 'settings',
    title: 'App Settings',
    subtitle: 'Notifications, language, and other settings.',
    icon: Settings,
    iconBg: '#FFF0F0',
    iconColor: '#E05638',
    targetScreen: 'Settings',
  },
];

export const HelpSupportScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = searchQuery.trim()
    ? HELP_TOPICS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : HELP_TOPICS;

  const handleTopicPress = (topic: TopicItem) => {
    if (topic.targetScreen) {
      navigation.navigate(topic.targetScreen as any);
    } else {
      Alert.alert(
        topic.title,
        `${topic.subtitle}\n\nOur team is available 24/7 if you need further assistance.`
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ChevronLeft size={22} color="#1E1E1E" strokeWidth={2.2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Help & Support</Text>
          </View>

          <View style={styles.headerRightShield}>
            <Shield size={18} color="#E05638" />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Illustration Card */}
          <View style={styles.heroCard}>
            <Image
              source={supportQuestionAsset}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <Text style={styles.scriptTagline}>We're here for you ♡</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Search size={18} color="#A89F97" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, city or community"
              placeholderTextColor="#A89F97"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Popular Help Topics Header */}
          <View style={styles.topicsHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Help Topics</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReportProblem')}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>See All &gt;</Text>
            </TouchableOpacity>
          </View>

          {/* Topics Card List */}
          <View style={styles.topicsCard}>
            {filteredTopics.map((topic, index) => {
              const IconComp = topic.icon;

              return (
                <React.Fragment key={topic.id}>
                  <TouchableOpacity
                    style={styles.topicRow}
                    onPress={() => handleTopicPress(topic)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[styles.topicIconCircle, { backgroundColor: topic.iconBg }]}
                    >
                      <IconComp size={17} color={topic.iconColor} />
                    </View>
                    <View style={styles.topicTextCol}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                    </View>
                    <ChevronRight size={16} color="#A0A0A0" />
                  </TouchableOpacity>
                  {index < filteredTopics.length - 1 && (
                    <View style={styles.topicDivider} />
                  )}
                </React.Fragment>
              );
            })}
          </View>

          {/* Still need help Callout Card */}
          <View style={styles.stillNeedHelpCard}>
            <View style={styles.headsetIconBox}>
              <Headphones size={18} color="#E05638" />
            </View>
            <View style={styles.stillNeedHelpTextCol}>
              <Text style={styles.stillNeedHelpTitle}>Still need help?</Text>
              <Text style={styles.stillNeedHelpSubtitle}>Our support team is here for you.</Text>
            </View>
            <TouchableOpacity
              style={styles.contactSupportBtn}
              onPress={() => navigation.navigate('ReportProblem')}
              activeOpacity={0.85}
            >
              <Text style={styles.contactSupportText}>Contact Support &gt;</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>

      {/* Floating Bottom Navigation Tab Bar */}
      <FloatingNavTabBar activeTab="Home" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFEFE6',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFEFE6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: '#1E1E1E',
  },
  headerRightShield: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroImage: {
    width: 140,
    height: 125,
    marginBottom: 8,
  },
  scriptTagline: {
    fontFamily: fontFamilies.bold,
    fontStyle: 'italic',
    fontSize: 18,
    color: '#E05638',
    textAlign: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#1E1E1E',
    padding: 0,
    margin: 0,
  },
  topicsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14.5,
    color: '#1E1E1E',
  },
  seeAllText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12.5,
    color: '#E05638',
  },
  topicsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  topicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  topicTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  topicSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
    lineHeight: 15,
  },
  topicDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  stillNeedHelpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE0CF',
  },
  headsetIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stillNeedHelpTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  stillNeedHelpTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 12.5,
    color: '#3D2D24',
    marginBottom: 2,
  },
  stillNeedHelpSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#6D5C52',
  },
  contactSupportBtn: {
    backgroundColor: '#FA6400',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  contactSupportText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },
});
