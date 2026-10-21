export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: string;
  gender: 'male' | 'female';
  profession: string;
  education: string;
  location: string;
  city: string;
  state: string;
  country: string;
  religion: string;
  caste: string;
  motherTongue: string;
  maritalStatus: string;
  about: string;
  photos: string[];
  isVerified: boolean;
  isPremium: boolean;
  matchScore: number;
  partnerPreferences: {
    ageRange: string;
    heightRange: string;
    religion: string[];
    caste: string[];
    education: string[];
    maritalStatus: string[];
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: UserProfile;
  lastMessage: ChatMessage;
  unreadCount: number;
}

export interface InterestItem {
  id: string;
  profile: UserProfile;
  status: 'pending' | 'accepted' | 'declined';
  type: 'received' | 'sent';
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  type: 'interest' | 'match' | 'message' | 'visitor';
  profileId?: string;
}
