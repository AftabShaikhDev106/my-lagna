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
  ChevronDown,
  Bell,
  User,
  Edit3,
  MessageSquare,
  Eye,
  Heart,
  Sparkles,
  Megaphone,
  Moon,
  Clock,
  Shield,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'NotificationSettings'>;

export const NotificationSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [newInterests, setNewInterests] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [profileViews, setProfileViews] = useState(true);
  const [newMatches, setNewMatches] = useState(false);
  const [matchRecommendations, setMatchRecommendations] = useState(false);
  const [appAnnouncements, setAppAnnouncements] = useState(false);

  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [fromTime, setFromTime] = useState('10:00 PM');
  const [toTime, setToTime] = useState('08:00 AM');

  const handlePickFromTime = () => {
    Alert.alert('Quiet Hours - From', 'Choose start time for quiet hours:', [
      { text: '09:00 PM', onPress: () => setFromTime('09:00 PM') },
      { text: '10:00 PM', onPress: () => setFromTime('10:00 PM') },
      { text: '11:00 PM', onPress: () => setFromTime('11:00 PM') },
      { text: '12:00 AM', onPress: () => setFromTime('12:00 AM') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handlePickToTime = () => {
    Alert.alert('Quiet Hours - To', 'Choose end time for quiet hours:', [
      { text: '06:00 AM', onPress: () => setToTime('06:00 AM') },
      { text: '07:00 AM', onPress: () => setToTime('07:00 AM') },
      { text: '08:00 AM', onPress: () => setToTime('08:00 AM') },
      { text: '09:00 AM', onPress: () => setToTime('09:00 AM') },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
            <Text style={styles.headerTitle}>Notification Settings</Text>
          </View>

          <TouchableOpacity
            style={styles.headerBellBtn}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Bell size={18} color="#E05638" />
            <View style={styles.bellBadgeDot} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Info Banner Card */}
          <View style={styles.topBannerCard}>
            <View style={styles.bannerIconBox}>
              <Bell size={18} color="#E05638" />
            </View>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerTitle}>Notifications</Text>
              <Text style={styles.bannerSubtitle}>Manage your notification preferences</Text>
            </View>
          </View>

          {/* Section Header: PRIVACY */}
          <View style={styles.sectionHeaderRow}>
            <User size={14} color="#E05638" style={{ marginRight: 6 }} />
            <Text style={styles.sectionHeaderText}>PRIVACY</Text>
          </View>

          {/* Notification Toggles Card */}
          <View style={styles.togglesCard}>
            {/* New interests */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <Edit3 size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>New interests</Text>
                <Text style={styles.toggleSubtitle}>When someone shows interest in you</Text>
              </View>
              <Switch
                value={newInterests}
                onValueChange={setNewInterests}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* New messages */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <MessageSquare size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>New messages</Text>
                <Text style={styles.toggleSubtitle}>When you receive a new message</Text>
              </View>
              <Switch
                value={newMessages}
                onValueChange={setNewMessages}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Profile views */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <Eye size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>Profile views</Text>
                <Text style={styles.toggleSubtitle}>When someone views your profile</Text>
              </View>
              <Switch
                value={profileViews}
                onValueChange={setProfileViews}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* New matches */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <Heart size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>New matches</Text>
                <Text style={styles.toggleSubtitle}>When you get a new match</Text>
              </View>
              <Switch
                value={newMatches}
                onValueChange={setNewMatches}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Match recommendations */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <Sparkles size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>Match recommendations</Text>
                <Text style={styles.toggleSubtitle}>Personalized match suggestions for you</Text>
              </View>
              <Switch
                value={matchRecommendations}
                onValueChange={setMatchRecommendations}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* App updates & announcements */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconBox}>
                <Megaphone size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>App updates & announcements</Text>
                <Text style={styles.toggleSubtitle}>Important updates and new features</Text>
              </View>
              <Switch
                value={appAnnouncements}
                onValueChange={setAppAnnouncements}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Quiet Hours Card */}
          <View style={styles.quietHoursCard}>
            <View style={styles.quietHoursTopRow}>
              <View style={styles.toggleIconBox}>
                <Moon size={16} color="#E05638" />
              </View>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>Quiet hours</Text>
                <Text style={styles.toggleSubtitle}>Mute notifications during these hours</Text>
              </View>
              <Switch
                value={quietHoursEnabled}
                onValueChange={setQuietHoursEnabled}
                trackColor={{ false: '#DAC8BC', true: '#E05638' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {quietHoursEnabled && (
              <>
                <View style={styles.quietHoursDivider} />
                <View style={styles.timePickersRow}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>From</Text>
                    <TouchableOpacity
                      style={styles.timePickerButton}
                      onPress={handlePickFromTime}
                      activeOpacity={0.7}
                    >
                      <Clock size={13} color="#E05638" style={{ marginRight: 6 }} />
                      <Text style={styles.timePickerText}>{fromTime}</Text>
                      <ChevronDown size={14} color="#8E8A85" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>to</Text>
                    <TouchableOpacity
                      style={styles.timePickerButton}
                      onPress={handlePickToTime}
                      activeOpacity={0.7}
                    >
                      <Clock size={13} color="#E05638" style={{ marginRight: 6 }} />
                      <Text style={styles.timePickerText}>{toTime}</Text>
                      <ChevronDown size={14} color="#8E8A85" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Subtext callout inside Quiet Hours */}
                <View style={styles.quietHoursNotice}>
                  <Clock size={13} color="#E05638" style={{ marginRight: 6 }} />
                  <Text style={styles.quietHoursNoticeText}>
                    You won't receive push notifications during quiet hours.
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Bottom You're In Control Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.shieldIconBox}>
              <Shield size={18} color="#E05638" fill="#FFF0E6" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>You're in control</Text>
              <Text style={styles.calloutSubtitle}>
                You can change these preferences anytime from settings.
              </Text>
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
  headerBellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadgeDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E05638',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  topBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  bannerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
  },
  bannerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionHeaderText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#E05638',
    letterSpacing: 0.8,
  },
  togglesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toggleTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  toggleTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  toggleSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  quietHoursCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  quietHoursTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quietHoursDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
    marginVertical: 12,
  },
  timePickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  timeCol: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 11.5,
    color: '#8E8A85',
    marginBottom: 6,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF8F4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE0D6',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  timePickerText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: '#1E1E1E',
    flex: 1,
  },
  quietHoursNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  quietHoursNoticeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#7D6A5E',
    flex: 1,
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
});
