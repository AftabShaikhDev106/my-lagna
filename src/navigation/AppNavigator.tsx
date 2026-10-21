import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import { ProfileDetailScreen } from '../features/profile/screens/ProfileDetailScreen';
import { ChatDetailScreen } from '../features/chat/screens/ChatDetailScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { ProfileVisitorsScreen } from '../features/profile/screens/ProfileVisitorsScreen';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen';
import { PrivacySecurityScreen } from '../features/settings/screens/PrivacySecurityScreen';
import { LanguageScreen } from '../features/settings/screens/LanguageScreen';
import { NotificationSettingsScreen } from '../features/settings/screens/NotificationSettingsScreen';
import { NotificationsScreen } from '../features/settings/screens/NotificationsScreen';
import { ProfileVerificationScreen } from '../features/profile/screens/ProfileVerificationScreen';
import { AboutMyLagnaScreen } from '../features/settings/screens/AboutMyLagnaScreen';
import { PremiumScreen } from '../features/premium/screens/PremiumScreen';
import { HelpSupportScreen } from '../features/support/screens/HelpSupportScreen';
import { ReportProblemScreen } from '../features/support/screens/ReportProblemScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ProfileVisitors" component={ProfileVisitorsScreen} />
      <Stack.Screen name="ProfileVerification" component={ProfileVerificationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="AboutMyLagna" component={AboutMyLagnaScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
    </Stack.Navigator>
  );
};
