import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  CheckCheck,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'Notifications'>;

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  read: boolean;
  type: 'interest' | 'message' | 'shortlist' | 'accepted' | 'offer' | 'profile';
  targetScreen?: keyof AppStackParamList;
}

const INITIAL_TODAY_NOTIFS: NotificationItem[] = [
  {
    id: 't1',
    title: 'Akanksha sent you an interest',
    subtitle: '92% Match • 2 minutes ago',
    read: false,
    type: 'interest',
  },
  {
    id: 't2',
    title: 'Prajakta sent you a message',
    subtitle: '"How was your day?" • 15 minutes ago',
    read: false,
    type: 'message',
  },
  {
    id: 't3',
    title: 'Shreya shortlisted your profile',
    subtitle: '1 hour ago',
    read: false,
    type: 'shortlist',
  },
  {
    id: 't4',
    title: 'Your interest got accepted',
    subtitle: 'You can now start chatting! • 2 hours ago',
    read: false,
    type: 'accepted',
  },
];

const INITIAL_EARLIER_NOTIFS: NotificationItem[] = [
  {
    id: 'e1',
    title: 'Prajakta sent you a message',
    subtitle: '"How was your day?" • 15 minutes ago',
    read: true,
    type: 'message',
  },
  {
    id: 'e2',
    title: 'Shreya shortlisted your profile',
    subtitle: '2 hours ago',
    read: true,
    type: 'shortlist',
  },
  {
    id: 'e3',
    title: 'Your interest got accepted',
    subtitle: 'You can now start chatting! • 2 hours ago',
    read: true,
    type: 'accepted',
  },
  {
    id: 'e4',
    title: 'Special offer for you!',
    subtitle: 'Check out our premium plans • 2 hours ago',
    read: true,
    type: 'offer',
    targetScreen: 'Premium',
  },
  {
    id: 'e5',
    title: 'Your Profile is 90% Complete',
    subtitle: 'Add photos to get more views • 2 hours ago',
    read: true,
    type: 'profile',
    targetScreen: 'EditProfile',
  },
];

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [todayList, setTodayList] = useState(INITIAL_TODAY_NOTIFS);
  const [earlierList, setEarlierList] = useState(INITIAL_EARLIER_NOTIFS);

  const handleMarkAllRead = () => {
    setTodayList((prev) => prev.map((item) => ({ ...item, read: true })));
    setEarlierList((prev) => prev.map((item) => ({ ...item, read: true })));
    Alert.alert('Success', 'All notifications marked as read.');
  };

  const handleItemPress = (item: NotificationItem) => {
    // mark single as read
    setTodayList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, read: true } : i))
    );
    if (item.targetScreen) {
      navigation.navigate(item.targetScreen as any);
    } else if (item.type === 'message') {
      try {
        navigation.navigate('MainTabs', { screen: 'Chats' } as any);
      } catch {
        // fallback
      }
    } else if (item.type === 'interest' || item.type === 'shortlist') {
      try {
        navigation.navigate('MainTabs', { screen: 'Interests' } as any);
      } catch {
        // fallback
      }
    } else {
      Alert.alert(item.title, item.subtitle);
    }
  };

  const filterItems = (list: NotificationItem[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  };

  const filteredToday = filterItems(todayList);
  const filteredEarlier = filterItems(earlierList);

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
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>

          <TouchableOpacity
            style={styles.markAllReadBtn}
            onPress={handleMarkAllRead}
            activeOpacity={0.7}
          >
            <CheckCheck size={14} color="#E05638" style={{ marginRight: 4 }} />
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search / Filter Bar */}
          <View style={styles.searchFilterContainer}>
            <Search size={18} color="#A89F97" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, city or community"
              placeholderTextColor="#A89F97"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => Alert.alert('Filter', 'Filter by unread, messages, or interests.')}
              activeOpacity={0.7}
            >
              <SlidersHorizontal size={17} color="#E05638" />
            </TouchableOpacity>
          </View>

          {/* Section: Today */}
          {filteredToday.length > 0 && (
            <>
              <Text style={styles.sectionHeaderTitle}>Today</Text>
              <View style={styles.notifCard}>
                {filteredToday.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <TouchableOpacity
                      style={styles.notifRow}
                      onPress={() => handleItemPress(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.avatarRedBox} />
                      <View style={styles.notifTextCol}>
                        <Text style={styles.notifTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.notifSubtitle} numberOfLines={1}>
                          {item.subtitle}
                        </Text>
                      </View>
                      <View style={styles.rightActionCol}>
                        {!item.read && <View style={styles.unreadDot} />}
                        <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 6 }} />
                      </View>
                    </TouchableOpacity>
                    {index < filteredToday.length - 1 && <View style={styles.rowDivider} />}
                  </React.Fragment>
                ))}
              </View>
            </>
          )}

          {/* Section: Earlier */}
          {filteredEarlier.length > 0 && (
            <>
              <Text style={styles.sectionHeaderTitle}>Earlier</Text>
              <View style={styles.notifCard}>
                {filteredEarlier.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <TouchableOpacity
                      style={styles.notifRow}
                      onPress={() => handleItemPress(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.avatarRedBox} />
                      <View style={styles.notifTextCol}>
                        <Text style={styles.notifTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.notifSubtitle} numberOfLines={1}>
                          {item.subtitle}
                        </Text>
                      </View>
                      <View style={styles.rightActionCol}>
                        <ChevronRight size={16} color="#A0A0A0" />
                      </View>
                    </TouchableOpacity>
                    {index < filteredEarlier.length - 1 && <View style={styles.rowDivider} />}
                  </React.Fragment>
                ))}
              </View>
            </>
          )}
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
  markAllReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllReadText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: '#E05638',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#1E1E1E',
    padding: 0,
    margin: 0,
  },
  filterBtn: {
    padding: 4,
    marginLeft: 6,
  },
  sectionHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  notifCard: {
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
  notifRow: {
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
  notifTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  notifTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
  },
  notifSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  rightActionCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FA6400',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
});
