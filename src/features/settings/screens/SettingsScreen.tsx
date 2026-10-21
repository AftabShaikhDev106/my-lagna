import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  User,
  Sliders,
  MessageSquare,
  ShieldAlert,
  Edit3,
  ShieldCheck,
  Lock,
  Bell,
  Globe,
  HelpCircle,
  Flag,
  Info,
  LogOut,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { premiumCrownAsset } from '../../../assets';
import { useAuthStore } from '../../../store/authStore';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is irreversible. All your matches, messages, and profile data will be permanently erased.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header with Crown Graphic */}
          <View style={styles.headerRow}>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>
                Manage your account, preferences{'\n'}and more
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Premium')}
              activeOpacity={0.8}
            >
              <Image
                source={premiumCrownAsset}
                style={styles.headerCrownImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Section 1: ACCOUNT */}
          <View style={styles.sectionHeaderRow}>
            <User size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>ACCOUNT</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Edit3 size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Edit Profile</Text>
                <Text style={styles.itemSubtitle}>Update your personal information</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Verification */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('ProfileVerification')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <ShieldCheck size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Verification</Text>
                <Text style={styles.itemSubtitle}>Verify your profile to build trust</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Privacy & Security */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('PrivacySecurity')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Lock size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Privacy & Security</Text>
                <Text style={styles.itemSubtitle}>Manage your privacy and security</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Section 2: PREFERENCES */}
          <View style={styles.sectionHeaderRow}>
            <Sliders size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>PREFERENCES</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Notification Settings */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('NotificationSettings')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Bell size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Notification Settings</Text>
                <Text style={styles.itemSubtitle}>Manage your notifications</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Language */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('Language')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Globe size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Language</Text>
                <Text style={styles.itemSubtitle}>Choose your preferred language</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Match preferences */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => {
                Alert.alert(
                  'Match Preferences',
                  'Age, religion, community, education, and location filters are configured.'
                );
              }}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Sliders size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Match preferences</Text>
                <Text style={styles.itemSubtitle}>Set your match preferences</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Section 3: Support */}
          <View style={styles.sectionHeaderRow}>
            <MessageSquare size={15} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>Support</Text>
          </View>

          <View style={styles.sectionCard}>
            {/* Help & Support */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('HelpSupport')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <HelpCircle size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Help & Support</Text>
                <Text style={styles.itemSubtitle}>Get help and support</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* Report a Problem */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('ReportProblem')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Flag size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>Report a Problem</Text>
                <Text style={styles.itemSubtitle}>Report issues to improve our app</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.itemDivider} />

            {/* About My Lagna */}
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => navigation.navigate('AboutMyLagna')}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconBox}>
                <Info size={16} color="#E05638" />
              </View>
              <View style={styles.itemTextCol}>
                <Text style={styles.itemTitle}>About My Lagna</Text>
                <Text style={styles.itemSubtitle}>App information and terms</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Section 4: Danger Zone */}
          <View style={styles.dangerHeaderRow}>
            <ShieldAlert size={15} color="#E53935" style={{ marginRight: 6 }} />
            <Text style={styles.dangerHeaderText}>Danger Zone</Text>
          </View>

          {/* Logout Card */}
          <TouchableOpacity
            style={styles.dangerCard}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <View style={styles.dangerIconBox}>
              <LogOut size={18} color="#E53935" />
            </View>
            <View style={styles.itemTextCol}>
              <Text style={styles.dangerTitle}>Logout</Text>
              <Text style={styles.itemSubtitle}>Sign out from your account</Text>
            </View>
            <ChevronRight size={16} color="#E53935" />
          </TouchableOpacity>

          {/* Delete Account Card */}
          <TouchableOpacity
            style={styles.dangerCard}
            onPress={handleDeleteAccount}
            activeOpacity={0.8}
          >
            <View style={styles.dangerIconBox}>
              <Trash2 size={18} color="#E53935" />
            </View>
            <View style={styles.itemTextCol}>
              <Text style={styles.dangerTitle}>Delete Account</Text>
              <Text style={styles.itemSubtitle}>Permanently delete your account</Text>
            </View>
            <ChevronRight size={16} color="#E53935" />
          </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    color: '#1E1E1E',
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12.5,
    color: '#777777',
    lineHeight: 17,
    marginTop: 4,
  },
  headerCrownImage: {
    width: 72,
    height: 72,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 18,
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
  itemDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  dangerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dangerHeaderText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#E53935',
    letterSpacing: 0.8,
  },
  dangerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  dangerIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#E53935',
  },
});
