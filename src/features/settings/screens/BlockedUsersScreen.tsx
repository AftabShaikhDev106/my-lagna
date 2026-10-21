import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ShieldX,
  Lock,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'BlockedUsers'>;

interface BlockedUser {
  id: string;
  name: string;
  location: string;
}

const INITIAL_BLOCKED: BlockedUser[] = [
  { id: '1', name: 'Rahul Sharma', location: 'Pune, Maharashtra' },
  { id: '2', name: 'Rahul Sharma', location: 'Pune, Maharashtra' },
  { id: '3', name: 'Rahul Sharma', location: 'Pune, Maharashtra' },
  { id: '4', name: 'Rahul Sharma', location: 'Pune, Maharashtra' },
  { id: '5', name: 'Rahul Sharma', location: 'Pune, Maharashtra' },
];

export const BlockedUsersScreen: React.FC<Props> = ({ navigation }) => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(INITIAL_BLOCKED);

  const handleUnblock = (user: BlockedUser) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${user.name}? They will be able to see your profile and connect with you again.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          style: 'destructive',
          onPress: () => {
            setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id));
            Alert.alert('User Unblocked', `${user.name} has been removed from your blocked list.`);
          },
        },
      ]
    );
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
            <Text style={styles.headerTitle}>Blocked Users</Text>
          </View>

          <View style={styles.headerRightShield}>
            <ShieldX size={18} color="#E05638" />
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.shieldIconBox}>
              <ShieldX size={18} color="#E05638" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>You're in control</Text>
              <Text style={styles.calloutSubtitle}>
                Blocked users can't see your profile, send you interests or messages.
              </Text>
            </View>
          </View>

          {/* Section Title with Count */}
          <Text style={styles.sectionHeaderTitle}>Blocked ({blockedUsers.length})</Text>

          {/* Blocked Users List Card */}
          <View style={styles.usersCard}>
            {blockedUsers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No Blocked Users</Text>
                <Text style={styles.emptySubtitle}>You haven't blocked any members yet.</Text>
              </View>
            ) : (
              blockedUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <View style={styles.userRow}>
                    {/* Red Avatar Box */}
                    <View style={styles.avatarRedBox} />

                    {/* User Info Col */}
                    <View style={styles.userInfoCol}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Text style={styles.userLocation}>{user.location}</Text>
                    </View>

                    {/* Unblock Button */}
                    <TouchableOpacity
                      style={styles.unblockBtn}
                      onPress={() => handleUnblock(user)}
                      activeOpacity={0.8}
                    >
                      <Lock size={12} color="#E05638" style={{ marginRight: 4 }} />
                      <Text style={styles.unblockBtnText}>Unblock</Text>
                    </TouchableOpacity>
                  </View>
                  {index < blockedUsers.length - 1 && <View style={styles.rowDivider} />}
                </React.Fragment>
              ))
            )}
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
  calloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE0CF',
  },
  shieldIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  calloutTextCol: {
    flex: 1,
  },
  calloutTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#3D2D24',
    marginBottom: 2,
  },
  calloutSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#6D5C52',
    lineHeight: 14,
  },
  sectionHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  usersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarRedBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E53935',
    marginRight: 12,
  },
  userInfoCol: {
    flex: 1,
    paddingRight: 8,
  },
  userName: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  userLocation: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  unblockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD6C2',
  },
  unblockBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 11,
    color: '#E05638',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
  },
  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#8E8A85',
    marginTop: 4,
  },
});
