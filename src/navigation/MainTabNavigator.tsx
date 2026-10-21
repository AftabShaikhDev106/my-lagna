import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { DiscoverScreen } from '../features/discover/screens/DiscoverScreen';
import { InterestsScreen } from '../features/interests/screens/InterestsScreen';
import { ChatsScreen } from '../features/chat/screens/ChatsScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { CustomTabBar } from './components/CustomTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Discover',
        }}
      />
      <Tab.Screen
        name="Interests"
        component={InterestsScreen}
        options={{
          tabBarLabel: 'Interests',
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: 'Chats',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
