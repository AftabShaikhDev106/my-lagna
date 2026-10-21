import { Conversation, ChatMessage } from '../../types/common';
import { MOCK_PROFILES } from './mockProfiles';

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_01',
    conversationId: 'conv_101',
    senderId: 'prof_101',
    receiverId: 'usr_001',
    text: 'Namaste! Thank you for accepting my interest.',
    timestamp: '10:30 AM',
    isRead: true,
  },
  {
    id: 'msg_02',
    conversationId: 'conv_101',
    senderId: 'usr_001',
    receiverId: 'prof_101',
    text: 'Namaste Ananya! Pleasant to connect with you.',
    timestamp: '10:32 AM',
    isRead: true,
  },
  {
    id: 'msg_03',
    conversationId: 'conv_101',
    senderId: 'prof_101',
    receiverId: 'usr_001',
    text: 'I noticed we share similar interests in travel. Have you visited Himachal recently?',
    timestamp: '10:35 AM',
    isRead: false,
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_101',
    participant: MOCK_PROFILES[0],
    lastMessage: MOCK_MESSAGES[2],
    unreadCount: 1,
  },
  {
    id: 'conv_102',
    participant: MOCK_PROFILES[2],
    lastMessage: {
      id: 'msg_04',
      conversationId: 'conv_102',
      senderId: 'prof_103',
      receiverId: 'usr_001',
      text: 'Would love to know more about your family background.',
      timestamp: 'Yesterday',
      isRead: true,
    },
    unreadCount: 0,
  },
];
