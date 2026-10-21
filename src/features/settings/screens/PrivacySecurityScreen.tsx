import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  User,
  Edit3,
  ShieldCheck,
  Lock,
  Check,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'PrivacySecurity'>;

export const PrivacySecurityScreen: React.FC<Props> = ({ navigation }) => {
  const [profileVisibility, setProfileVisibility] = useState<boolean>(true);
  const [hideProfile, setHideProfile] = useState<boolean>(false);
  const [viewProfileAccess, setViewProfileAccess] = useState<string>('All Members');
  const [viewInterestsAccess, setViewInterestsAccess] = useState<string>('All Members');

  const handleSelectProfileAccess = () => {
    Alert.alert(
      'Who can view my profile',
      'Select visibility preference for your profile',
      [
        {
          text: 'All Members',
          onPress: () => setViewProfileAccess('All Members'),
        },
        {
          text: 'Matches Only',
          onPress: () => setViewProfileAccess('Matches Only'),
        },
        {
          text: 'Premium Members Only',
          onPress: () => setViewProfileAccess('Premium Only'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSelectInterestsAccess = () => {
    Alert.alert(
      'Who can view my interests',
      'Select who can send you connection interests',
      [
        {
          text: 'All Members',
          onPress: () => setViewInterestsAccess('All Members'),
        },
        {
          text: 'Verified Members Only',
          onPress: () => setViewInterestsAccess('Verified Only'),
        },
        { text: 'Cancel', style: 'cancel' },
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
            <Text style={styles.headerTitle}>Privacy & Security</Text>
          </View>

          <View style={styles.headerRightShield}>
            <Shield size={18} color="#E05638" />
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: PRIVACY */}
          <View style={styles.sectionHeaderRow}>
            <User size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>PRIVACY</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Who can view my profile */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={handleSelectProfileAccess}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Edit3 size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Who can view my profile</Text>
                <Text style={styles.itemSubtitle}>Choose who can see your profile</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <Text style={styles.orangeBadgeText}>{viewProfileAccess}</Text>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 2 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Who can view my interests */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={handleSelectInterestsAccess}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <ShieldCheck size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Who can view my interests</Text>
                <Text style={styles.itemSubtitle}>Choose who can send you interests</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <Text style={styles.orangeBadgeText}>{viewInterestsAccess}</Text>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 2 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Profile visibility */}
            <View style={styles.itemRow}>
              <View style={styles.itemIconBox}>
                <Lock size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Profile visibility</Text>
                <Text style={styles.itemSubtitle}>Show your profile in search results</Text>
              </View>
              <Switch
                value={profileVisibility}
                onValueChange={(val) => {
                  setProfileVisibility(val);
                  if (val && hideProfile) {
                    setHideProfile(false);
                  }
                }}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.itemDivider} />

            {/* Hide my profile */}
            <View style={styles.itemRow}>
              <View style={styles.itemIconBox}>
                <Lock size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Hide my profile</Text>
                <Text style={styles.itemSubtitle}>Temporarily hide your profile</Text>
              </View>
              <Switch
                value={hideProfile}
                onValueChange={(val) => {
                  setHideProfile(val);
                  if (val && profileVisibility) {
                    setProfileVisibility(false);
                  }
                }}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* You're in control Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.shieldIconBox}>
              <Shield size={18} color="#E05638" fill="#FFF0E6" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>You're in control</Text>
              <Text style={styles.calloutSubtitle}>
                We never share your personal information with anyone without your permission.
              </Text>
            </View>
            <View style={styles.calloutCircleRight}>
              <Lock size={14} color="#E05638" />
            </View>
          </View>

          {/* Section 2: SECURITY */}
          <View style={styles.sectionHeaderRow}>
            <Shield size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>SECURITY</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Change password */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Change Password', 'A secure reset link has been sent to your registered email.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Edit3 size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Change password</Text>
                <Text style={styles.itemSubtitle}>Update your account password</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Phone number */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Phone Number', '+91 98765 43210 is verified with OTP verification.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <ShieldCheck size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Phone number</Text>
                <Text style={styles.itemSubtitle}>+91 98765 43210</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>Verified</Text>
                  <Check size={11} color="#2E7D32" strokeWidth={2.5} style={{ marginLeft: 3 }} />
                </View>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Email address */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Email Address', 'aftab*****@gmail.com is confirmed and verified.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Lock size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Email address</Text>
                <Text style={styles.itemSubtitle}>aftab*****@gmail.com</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>Verified</Text>
                  <Check size={11} color="#2E7D32" strokeWidth={2.5} style={{ marginLeft: 3 }} />
                </View>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Two-factor authentication */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Two-factor Authentication', '2FA is active via SMS OTP for enhanced security.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Lock size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Two-factor authentication</Text>
                <Text style={styles.itemSubtitle}>Add an extra layer of security</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Section 3: SAFETY */}
          <View style={styles.sectionHeaderRow}>
            <Shield size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>SAFETY</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Blocked users */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Blocked Users', 'You have 12 blocked users. Blocked contacts cannot see your profile or send messages.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Edit3 size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Blocked users</Text>
                <Text style={styles.itemSubtitle}>View and manage blocked users</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <Text style={styles.orangeBadgeNumber}>12</Text>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Reported profiles */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert('Reported Profiles', 'You have reported 3 profiles. Our trust & safety team reviews each case within 24 hours.');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <ShieldCheck size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Reported profiles</Text>
                <Text style={styles.itemSubtitle}>View profiles you have reported</Text>
              </View>
              <View style={styles.badgeWithArrow}>
                <Text style={styles.orangeBadgeNumber}>3</Text>
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Your safety matters Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.shieldIconBox}>
              <Shield size={18} color="#E05638" fill="#FFF0E6" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>Your safety matters</Text>
              <Text style={styles.calloutSubtitle}>
                We use industry-standard encryption to keep your data safe and secure.
              </Text>
            </View>
            <View style={styles.secureBadgePill}>
              <Lock size={11} color="#E05638" style={{ marginRight: 3 }} />
              <Text style={styles.secureBadgePillText}>100% Secure</Text>
            </View>
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionHeaderText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#E05638',
    letterSpacing: 0.8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  itemTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  itemSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  badgeWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeBadgeText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11.5,
    color: '#E05638',
  },
  orangeBadgeNumber: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#E05638',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  verifiedText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#2E7D32',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
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
    paddingRight: 8,
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
  calloutCircleRight: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#FFD6C2',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD6C2',
  },
  secureBadgePillText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: '#E05638',
  },
});
