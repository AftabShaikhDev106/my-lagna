import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { privacyShieldMattersAsset, welcomeFortAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'PrivacyPolicy'>;

interface PolicyItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  details: string;
}

const POLICIES: PolicyItem[] = [
  {
    id: '1',
    number: '01',
    title: 'Information We Collect',
    subtitle: 'We collect information you provide, such as your profile details, photos and preferences.',
    details:
      'We collect registration details (name, email, date of birth, phone number), profile information (community, occupation, education, family details), photographs uploaded, and communication preferences to match you with compatible prospects.',
  },
  {
    id: '2',
    number: '02',
    title: 'How We Use Information',
    subtitle: 'We use your information to provide, improve and personalize your experience on My Lagna.',
    details:
      'Your information is used solely to generate matchmaking recommendations, verify profile genuineness, facilitate communication between interested parties, and provide customer support services.',
  },
  {
    id: '3',
    number: '03',
    title: 'Your Profile Visibility',
    subtitle: 'You control who can see your profile and personal information.',
    details:
      'You maintain comprehensive granular control over your profile visibility, photo privacy, and phone number sharing. You can choose whether your profile is discoverable by all members, verified members, or only approved connections.',
  },
  {
    id: '4',
    number: '04',
    title: 'Data Security',
    subtitle: 'We take security seriously and use industry-standard measures to protect your data.',
    details:
      'All user communications, identity verification documents, and payment details are safeguarded using 256-bit SSL encryption and strict access controls to prevent unauthorized access or breach.',
  },
  {
    id: '5',
    number: '05',
    title: 'Sharing Information',
    subtitle: 'We do not sell your personal data. We may share information only in limited and necessary cases.',
    details:
      'My Lagna never sells your personal data to third-party advertisers. Data is shared strictly with trusted payment gateways or law enforcement agencies when legally required.',
  },
  {
    id: '6',
    number: '06',
    title: 'Your Rights & Controls',
    subtitle: 'You can access, update or delete your information at any time.',
    details:
      'You hold full ownership rights to request a copy of your personal data, edit your preferences, or permanently delete your account and all associated records from our active databases.',
  },
  {
    id: '7',
    number: '07',
    title: 'Contact Us',
    subtitle: "If you have any questions about this Privacy Policy, we're here to help.",
    details:
      'Our dedicated Privacy & Data Protection Officer is available at privacy@mylagna.in or support@mylagna.in to address any privacy inquiries or grievance redressals.',
  },
];

export const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.rootContainer}>
      <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ChevronLeft size={22} color="#1E1E1E" strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About My Lagna</Text>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Illustration Card */}
          <View style={styles.heroCard}>
            <Image
              source={privacyShieldMattersAsset}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <Text style={styles.heroTitle}>Your Privacy Matters</Text>
            <Text style={styles.heroSubtitle}>Your information is safe with us</Text>
          </View>

          {/* Accordion Privacy List */}
          <View style={styles.policyList}>
            {POLICIES.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.policyCard}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.policyHeaderRow}>
                    {/* Orange Number Badge */}
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberBadgeText}>{item.number}</Text>
                    </View>

                    {/* Middle Text Col */}
                    <View style={styles.policyTextCol}>
                      <Text style={styles.policyTitle}>{item.title}</Text>
                      <Text style={styles.policySubtitle}>{item.subtitle}</Text>
                    </View>

                    {/* Chevron Indicator */}
                    <View style={styles.chevronBox}>
                      {isExpanded ? (
                        <ChevronUp size={18} color="#8E8A85" />
                      ) : (
                        <ChevronDown size={18} color="#8E8A85" />
                      )}
                    </View>
                  </View>

                  {/* Expanded Details Body */}
                  {isExpanded && (
                    <View style={styles.expandedDetailsBox}>
                      <Text style={styles.expandedDetailsText}>{item.details}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer Section: Made with Love in India */}
          <View style={styles.footerSection}>
            <Text style={styles.footerIndiaText}>Made with ❤️ in India</Text>
            <Text style={styles.footerSubtext}>
              For a stronger community, a brighter tomorrow.
            </Text>

            {/* Heritage Fort Silhouette Skyline */}
            <Image
              source={welcomeFortAsset}
              style={styles.fortSkylineImage}
              resizeMode="cover"
            />
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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFEFE6',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroImage: {
    width: 130,
    height: 120,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 19,
    color: '#E05638',
  },
  heroSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#777777',
    marginTop: 3,
  },
  policyList: {
    gap: 10,
    marginBottom: 20,
  },
  policyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  policyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF0E6',
    borderWidth: 1,
    borderColor: '#FFD6C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#E05638',
  },
  policyTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  policyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  policySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#777777',
    marginTop: 2,
    lineHeight: 14,
  },
  chevronBox: {
    padding: 4,
  },
  expandedDetailsBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3E9E2',
  },
  expandedDetailsText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#555555',
    lineHeight: 16,
  },
  footerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    position: 'relative',
  },
  footerIndiaText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: '#444444',
  },
  footerSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#8E8A85',
    marginTop: 2,
    marginBottom: 16,
  },
  fortSkylineImage: {
    width: '100%',
    height: 75,
    opacity: 0.35,
    borderRadius: 16,
  },
});
