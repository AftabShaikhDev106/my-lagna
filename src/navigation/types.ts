import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Interests: undefined;
  Chats: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Login: { mode?: 'login' | 'register'; phoneNumber?: string } | undefined;
  SignUp: { mode?: 'login' | 'register'; phoneNumber?: string } | undefined;
  Otp: { phoneNumber?: string; email?: string } | undefined;
  ProfileSetup: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ProfileDetail: { profileId: string; mode?: 'discover' | 'profile' | 'chat' };
  ChatDetail: { conversationId: string; profileId: string };
  EditProfile: undefined;
  ProfileVisitors: undefined;
  Settings: undefined;
  Premium: undefined;
  HelpSupport: undefined;
  ReportProblem: undefined;
  PrivacySecurity: undefined;
  Language: undefined;
  NotificationSettings: undefined;
  Notifications: undefined;
  ProfileVerification: undefined;
  AboutMyLagna: undefined;
};

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};
