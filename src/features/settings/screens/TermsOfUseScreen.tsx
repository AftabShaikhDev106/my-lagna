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
import { termsDocumentAsset, welcomeFortAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'TermsOfUse'>;

interface TermItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  details: string;
}

const TERMS: TermItem[] = [
  {
    id: '1',
    number: '01',
    title: 'Acceptance of Terms',
    subtitle: 'By using My Lagna, you agree to these terms and conditions.',
    details:
      'These Terms of Use constitute a legally binding agreement between you and My Lagna. By accessing or using our platform, mobile application, or related matrimonial matchmaking services, you confirm that you have read, understood, and agreed to adhere to all terms contained herein.',
  },
  {
    id: '2',
    number: '02',
    title: 'Eligibility',
    subtitle: 'You must be at least 18 years old and provide accurate information.',
    details:
      'To register an account, members must be legally eligible to marry under the applicable laws of their jurisdiction (minimum 18 years for females and 21 years for males in India). All profile details, photographs, and identity documents must be genuine and truthful.',
  },
  {
    id: '3',
    number: '03',
    title: 'Your Account',
    subtitle: 'You are responsible for maintaining the confidentiality of your account.',
    details:
      'You are responsible for maintaining the security of your login credentials, including passwords and OTP codes. You agree to notify us immediately of any unauthorized access or security breach regarding your account.',
  },
  {
    id: '4',
    number: '04',
    title: 'Community Guidelines',
    subtitle: 'Be respectful, honest and kind. Inappropriate behaviour is not tolerated.',
    details:
      'My Lagna is committed to providing a safe, respectful, and family-friendly environment. Harassment, abusive language, inappropriate imagery, commercial solicitation, fraudulent activity, or misrepresentation will lead to instant account suspension.',
  },
  {
    id: '5',
    number: '05',
    title: 'Premium Services & Payments',
    subtitle: 'Premium features are subject to separate terms and may be changed at any time.',
    details:
      'Subscriptions and premium plan purchases provide enhanced visibility, unlimited connections, and priority support. All fees are clearly displayed prior to purchase and are subject to renewal according to the plan terms chosen.',
  },
  {
    id: '6',
    number: '06',
    title: 'Privacy',
    subtitle: 'Your privacy is important to us. Please review our Privacy Policy for details.',
    details:
      'We handle all personal data, contact information, photos, and verification documents in strict compliance with our Privacy Policy. We utilize end-to-end encryption to protect sensitive data.',
  },
  {
    id: '7',
    number: '07',
    title: 'Account Termination',
    subtitle: 'We reserve the right to suspend or terminate accounts that violate our terms.',
    details:
      'We reserve the right, at our discretion, to terminate or restrict access to any profile found violating these terms, posting misleading information, or compromising community trust.',
  },
];

export const TermsOfUseScreen: React.FC<Props> = ({ navigation }) => {
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
              source={termsDocumentAsset}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <Text style={styles.heroTitle}>Terms of Use</Text>
            <Text style={styles.heroSubtitle}>Please read these terms carefully</Text>
          </View>

          {/* Accordion Terms List */}
          <View style={styles.termsList}>
            {TERMS.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.termCard}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.termHeaderRow}>
                    {/* Orange Number Badge */}
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberBadgeText}>{item.number}</Text>
                    </View>

                    {/* Middle Text Col */}
                    <View style={styles.termTextCol}>
                      <Text style={styles.termTitle}>{item.title}</Text>
                      <Text style={styles.termSubtitle}>{item.subtitle}</Text>
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
  termsList: {
    gap: 10,
    marginBottom: 20,
  },
  termCard: {
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
  termHeaderRow: {
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
  termTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  termTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  termSubtitle: {
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
