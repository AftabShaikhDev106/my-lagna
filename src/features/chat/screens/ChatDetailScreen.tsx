import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Phone,
  MoreVertical,
  CheckCircle2,
  Paperclip,
  Smile,
  Mic,
  Send,
  CheckCheck,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { DISCOVER_PROFILES, DiscoverProfile } from '../../discover/data/discoverProfilesData';
import { MOCK_PROFILES } from '../../../services/mock/mockProfiles';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ChatDetail'>;

interface MessageItem {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'm1',
    senderId: 'them',
    text: 'Hello, How are you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Fine, What about you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm3',
    senderId: 'them',
    text: 'Hello, How are you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm4',
    senderId: 'me',
    text: 'Fine, What about you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm5',
    senderId: 'them',
    text: 'Hello, How are you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm6',
    senderId: 'me',
    text: 'Fine, What about you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm7',
    senderId: 'them',
    text: 'Hello, How are you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
  {
    id: 'm8',
    senderId: 'me',
    text: 'Fine, What about you?',
    timestamp: '9:45 PM',
    isRead: true,
  },
];

export const ChatDetailScreen: React.FC<Props> = ({ navigation, route }) => {
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
    photos: mockMatch?.photos && mockMatch.photos.length > 0
      ? mockMatch.photos
      : [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        ],
  };

  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: MessageItem = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text: inputText.trim(),
      timestamp: '9:46 PM',
      isRead: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const openProfileView = () => {
    navigation.navigate('ProfileDetail', { profileId: profile.id, mode: 'chat' });
  };

  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <ArrowLeft size={20} color="#1E1E1E" />
        </TouchableOpacity>

        {/* Candidate Avatar & Status */}
        <TouchableOpacity
          style={styles.headerProfileSection}
          onPress={openProfileView}
          activeOpacity={0.85}
        >
          <Image source={{ uri: profile.photos[0] }} style={styles.headerAvatar} />
          <View style={styles.headerTextWrapper}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
              {profile.isVerified ? (
                <CheckCircle2 size={16} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
              ) : null}
            </View>
            <View style={styles.onlineStatusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Right Phone Call & Menu Action Icons */}
        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Phone size={20} color="#A04000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={openProfileView} activeOpacity={0.7}>
            <MoreVertical size={20} color="#A04000" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Messages List Area */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesListContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.dateHeaderContainer}>
              <View style={styles.dateHeaderPill}>
                <Text style={styles.dateHeaderText}>Today</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === 'me';
            return (
              <View
                style={[
                  styles.messageRow,
                  isMe ? styles.messageRowMe : styles.messageRowThem,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isMe ? styles.bubbleMe : styles.bubbleThem,
                  ]}
                >
                  <Text style={[styles.messageText, isMe ? styles.textMe : styles.textThem]}>
                    {item.text}
                  </Text>
                  <View style={styles.timestampContainer}>
                    <Text style={[styles.timestampText, isMe ? styles.timestampMe : styles.timestampThem]}>
                      {item.timestamp}
                    </Text>
                    {isMe ? (
                      <CheckCheck size={14} color="#E05638" style={{ marginLeft: 4 }} />
                    ) : null}
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* Bottom Input Action Bar */}
        <View style={styles.bottomInputContainer}>
          {/* Attachment Paperclip Button */}
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.8}>
            <Paperclip size={20} color="#666666" />
          </TouchableOpacity>

          {/* Text Input Wrapper */}
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#999999"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.emojiBtn} activeOpacity={0.7}>
              <Smile size={20} color="#888888" />
            </TouchableOpacity>
          </View>

          {/* Send / Mic Circular Button */}
          <TouchableOpacity
            style={styles.sendMicBtn}
            onPress={inputText.trim() ? handleSend : () => {}}
            activeOpacity={0.85}
          >
            {inputText.trim() ? (
              <Send size={18} color="#FFFFFF" />
            ) : (
              <Mic size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E0D6',
  },
  headerBackBtn: {
    padding: 6,
    marginRight: 6,
  },
  headerProfileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFE6E1',
    marginRight: 10,
  },
  headerTextWrapper: {
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 17,
    color: '#1E1E1E',
  },
  onlineStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  onlineText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#4CAF50',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    padding: 6,
  },
  messagesListContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  dateHeaderContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateHeaderPill: {
    backgroundColor: '#FFF5EE',
    borderWidth: 1,
    borderColor: '#FFD6C2',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 14,
  },
  dateHeaderText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#A04000',
  },
  messageRow: {
    marginVertical: 6,
    flexDirection: 'row',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowThem: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    maxWidth: '78%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleMe: {
    backgroundColor: '#EBD8CB',
    borderTopRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  textMe: {
    color: '#1E1E1E',
  },
  textThem: {
    color: '#1E1E1E',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timestampText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
  },
  timestampMe: {
    color: '#8C5A42',
  },
  timestampThem: {
    color: '#888888',
  },
  bottomInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFEFE6',
    gap: 10,
  },
  attachBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 46,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#1E1E1E',
    paddingVertical: 0,
  },
  emojiBtn: {
    padding: 4,
  },
  sendMicBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E05638',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
