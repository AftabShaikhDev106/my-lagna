import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mylagna://', 'https://mylagna.com'],
  config: {
    screens: {
      AuthStack: {
        screens: {
          Login: 'login',
          SignUp: 'signup',
          Otp: 'otp',
        },
      },
      AppStack: {
        screens: {
          MainTabs: {
            screens: {
              Home: 'home',
              Discover: 'discover',
              Interests: 'interests',
              Chats: 'chats',
              Profile: 'profile',
            },
          },
          ProfileDetail: 'profile/:profileId',
          ChatDetail: 'chat/:conversationId',
          EditProfile: 'edit-profile',
          Settings: 'settings',
          Premium: 'premium',
          HelpSupport: 'help-support',
        },
      },
    },
  },
};
