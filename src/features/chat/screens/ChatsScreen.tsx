import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  MessageSquare,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react-native';
import { MainTabParamList, AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Chats'>,
  NativeStackScreenProps<AppStackParamList>
>;

interface ChatListItem {
  id: string;
  conversationId: string;
  profileId: string;
  name: string;
  age: number;
  isVerified: boolean;
  photoUrl: string;
  lastMessage: string;
  subtitleStatus: string;
  timestamp: string;
  unreadCount?: number;
  isOnline: boolean;
  isFavorite: boolean;
}

const MOCK_CHAT_LIST: ChatListItem[] = [
  {
    id: 'chat_1',
    conversationId: 'conv_101',
    profileId: 'disc_1',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Typing...',
    timestamp: '9:20 AM',
    unreadCount: 2,
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 'chat_2',
    conversationId: 'conv_102',
    profileId: 'disc_2',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'Hi, lol',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: '9:40 AM',
    unreadCount: 1,
    isOnline: true,
    isFavorite: false,
  },
  {
    id: 'chat_3',
    conversationId: 'conv_103',
    profileId: 'disc_3',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: 'Yesterday',
    isOnline: false,
    isFavorite: true,
  },
  {
    id: 'chat_4',
    conversationId: 'conv_104',
    profileId: 'disc_4',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 1d ago',
    timestamp: 'Mon',
    isOnline: false,
    isFavorite: false,
  },
  {
    id: 'chat_5',
    conversationId: 'conv_105',
    profileId: 'disc_1',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: '9:40 AM',
    isOnline: true,
    isFavorite: false,
  },
  {
    id: 'chat_6',
    conversationId: 'conv_106',
    profileId: 'disc_2',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: '9:40 AM',
    isOnline: false,
    isFavorite: false,
  },
  {
    id: 'chat_7',
    conversationId: 'conv_107',
    profileId: 'disc_3',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: '9:40 AM',
    isOnline: false,
    isFavorite: false,
  },
  {
    id: 'chat_8',
    conversationId: 'conv_108',
    profileId: 'disc_4',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    lastMessage: 'How was your day?',
    subtitleStatus: 'Last seen 2m ago',
    timestamp: '9:40 AM',
    isOnline: false,
    isFavorite: false,
  },
];

export const ChatsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'online' | 'favorite'>('all');

  const filteredChats = MOCK_CHAT_LIST.filter((chat) => {
    const matchesQuery =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (activeFilter === 'unread') return (chat.unreadCount || 0) > 0;
    if (activeFilter === 'online') return chat.isOnline;
    if (activeFilter === 'favorite') return chat.isFavorite;
    return true;
  });

  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Title Header */}
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>Chats</Text>
          <View style={styles.chatIconCircle}>
            <MessageSquare size={18} color="#E05638" fill="#FFF2EC" />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search & Filter Input Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color="#888888" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, city or community"
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <SlidersHorizontal size={18} color="#E05638" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Pills Horizontal Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsRow}
        >
          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'all' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'all' ? styles.filterTextActive : styles.filterTextInactive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'unread' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setActiveFilter('unread')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'unread' ? styles.filterTextActive : styles.filterTextInactive,
              ]}
            >
              Unread <Text style={styles.badgeDigitText}>2</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'online' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setActiveFilter('online')}
            activeOpacity={0.8}
          >
            <View style={styles.pillContentRow}>
              <View style={styles.onlineDotIndicator} />
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'online' ? styles.filterTextActive : styles.filterTextInactive,
                ]}
              >
                Online <Text style={styles.badgeDigitText}>3</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'favorite' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setActiveFilter('favorite')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'favorite' ? styles.filterTextActive : styles.filterTextInactive,
              ]}
            >
              Favorite <Text style={styles.badgeDigitText}>2</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Privacy Info Disclaimer Banner */}
        <View style={styles.privacyBanner}>
          <View style={styles.shieldIconWrapper}>
            <ShieldCheck size={20} color="#E05638" />
          </View>
          <View style={styles.privacyTextWrapper}>
            <Text style={styles.privacyTitle}>Your conversations are private</Text>
            <Text style={styles.privacySubtitle}>We don't share your chats with anyone.</Text>
          </View>
        </View>

        {/* Main Chats Card List Sheet */}
        <View style={[styles.chatsSheetCard, { backgroundColor: theme.colors.surface }]}>
          {filteredChats.map((chatItem, idx) => (
            <React.Fragment key={chatItem.id}>
              {idx > 0 ? <View style={styles.chatRowDivider} /> : null}
              <TouchableOpacity
                style={styles.chatRow}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ChatDetail', {
                    conversationId: chatItem.conversationId,
                    profileId: chatItem.profileId,
                  })
                }
              >
                {/* Avatar with Online Status Dot */}
                <TouchableOpacity
                  style={styles.avatarContainer}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ProfileDetail', {
                      profileId: chatItem.profileId,
                      mode: 'chat',
                    })
                  }
                >
                  <Image source={{ uri: chatItem.photoUrl }} style={styles.avatarImage} />
                  {chatItem.isOnline ? <View style={styles.onlineBadgeDot} /> : null}
                </TouchableOpacity>

                {/* Center Details */}
                <View style={styles.chatDetailsWrapper}>
                  <View style={styles.nameVerifiedRow}>
                    <Text style={[styles.chatNameText, { color: theme.colors.text }]} numberOfLines={1}>
                      {chatItem.name}, {chatItem.age}
                    </Text>
                    {chatItem.isVerified ? (
                      <CheckCircle2 size={16} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
                    ) : null}
                  </View>
                  <Text style={[styles.lastMessageText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {chatItem.lastMessage}
                  </Text>
                  <Text
                    style={[
                      styles.subtitleStatusText,
                      chatItem.subtitleStatus === 'Typing...'
                        ? { color: '#E05638', fontFamily: fontFamilies.bold }
                        : { color: theme.colors.textMuted },
                    ]}
                  >
                    {chatItem.subtitleStatus}
                  </Text>
                </View>

                {/* Right Timestamp & Unread Badge */}
                <View style={styles.rightColumn}>
                  <Text style={[styles.timestampText, { color: theme.colors.textMuted }]}>
                    {chatItem.timestamp}
                  </Text>
                  {chatItem.unreadCount ? (
                    <View style={styles.unreadBadgeCircle}>
                      <Text style={styles.unreadBadgeText}>{chatItem.unreadCount}</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFEFE6',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    color: '#1E1E1E',
    marginRight: 6,
  },
  chatIconCircle: {
    padding: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  searchSection: {
    marginBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#1E1E1E',
    paddingVertical: 0,
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
  },
  filterPillActive: {
    backgroundColor: '#E05638',
    borderColor: '#E05638',
  },
  filterPillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFD6C2',
  },
  pillContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDotIndicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  filterPillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontFamily: fontFamilies.bold,
  },
  filterTextInactive: {
    color: '#1E1E1E',
  },
  badgeDigitText: {
    fontFamily: fontFamilies.bold,
  },
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFDEC9',
  },
  shieldIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  privacyTextWrapper: {
    flex: 1,
  },
  privacyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 1,
  },
  privacySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#666666',
  },
  chatsSheetCard: {
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 10,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFE6E1',
  },
  onlineBadgeDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatDetailsWrapper: {
    flex: 1,
    paddingRight: 6,
  },
  nameVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatNameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
  },
  lastMessageText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    marginBottom: 2,
  },
  subtitleStatusText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timestampText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    marginBottom: 6,
  },
  unreadBadgeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E05638',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: '#FFFFFF',
  },
  chatRowDivider: {
    height: 1,
    backgroundColor: '#F3E8E2',
  },
});
