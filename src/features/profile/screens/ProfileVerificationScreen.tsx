import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Phone,
  FileText,
  Camera,
  Shield,
  ShieldCheck,
  Check,
  Eye,
  Heart,
  Sparkles,
  Lock,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { verificationShieldAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ProfileVerification'>;

export const ProfileVerificationScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneVerified] = useState(true);
  const [idVerified, setIdVerified] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);

  const handleVerifyStep = (step: 'phone' | 'id' | 'photo') => {
    if (step === 'phone') {
      Alert.alert('Phone Verification', 'Your mobile number is already OTP verified.');
    } else if (step === 'id') {
      Alert.alert(
        'Government ID Verification',
        'Upload Aadhaar Card, PAN Card, or Passport for instant verification.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upload Document',
            onPress: () => {
              setIdVerified(true);
              Alert.alert('Submitted!', 'Your ID has been submitted for verification.');
            },
          },
        ]
      );
    } else if (step === 'photo') {
      Alert.alert(
        'Photo Verification',
        'Take a live selfie to verify against your profile pictures.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Camera',
            onPress: () => {
              setPhotoVerified(true);
              Alert.alert('Success!', 'Selfie captured. Verification completed.');
            },
          },
        ]
      );
    }
  };

  const handleStartFullVerification = () => {
    if (idVerified && photoVerified) {
      Alert.alert('All Done!', 'Your profile is 100% verified with blue badge.');
    } else {
      handleVerifyStep(!idVerified ? 'id' : 'photo');
    }
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
            <Text style={styles.headerTitle}>Profile Verification</Text>
          </View>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() =>
              Alert.alert(
                'Why Verification Matters',
                'Profiles with verified badges receive 300% more replies and interest requests.'
              )
            }
            activeOpacity={0.7}
          >
            <HelpCircle size={20} color="#1E1E1E" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroRow}>
            <View style={styles.heroTextCol}>
              <Text style={styles.heroTitle1}>Build more trust,</Text>
              <Text style={styles.heroTitle2}>Get better matches</Text>
              <Text style={styles.heroSubtitle}>
                Verified profiles get 2x more connections and build instant trust.
              </Text>
            </View>

            <Image
              source={verificationShieldAsset}
              style={styles.heroShieldImage}
              resizeMode="contain"
            />
          </View>

          {/* Section: Verification steps */}
          <Text style={styles.sectionTitle}>Verification steps</Text>

          <View style={styles.stepsCard}>
            {/* Step 1: Phone Verification */}
            <TouchableOpacity
              style={styles.stepRow}
              onPress={() => handleVerifyStep('phone')}
              activeOpacity={0.7}
            >
              <View style={styles.stepIconCircle}>
                <Phone size={17} color="#E05638" />
              </View>
              <View style={styles.stepTextCol}>
                <Text style={styles.stepTitle}>Phone Verification</Text>
                <Text style={styles.stepSubtitle}>
                  Verify your mobile number to confirm your identity.
                </Text>
              </View>
              <View style={styles.badgeWithChevron}>
                {phoneVerified ? (
                  <View style={styles.verifiedPill}>
                    <Text style={styles.verifiedPillText}>Verified</Text>
                    <Check size={11} color="#2E7D32" strokeWidth={2.5} style={{ marginLeft: 3 }} />
                  </View>
                ) : (
                  <View style={styles.pendingPill}>
                    <Text style={styles.pendingPillText}>Pending</Text>
                  </View>
                )}
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.stepDivider} />

            {/* Step 2: ID Verification */}
            <TouchableOpacity
              style={styles.stepRow}
              onPress={() => handleVerifyStep('id')}
              activeOpacity={0.7}
            >
              <View style={styles.stepIconCircle}>
                <FileText size={17} color="#E05638" />
              </View>
              <View style={styles.stepTextCol}>
                <Text style={styles.stepTitle}>ID Verification</Text>
                <Text style={styles.stepSubtitle}>
                  Upload a valid government ID to verify your profile.
                </Text>
              </View>
              <View style={styles.badgeWithChevron}>
                {idVerified ? (
                  <View style={styles.verifiedPill}>
                    <Text style={styles.verifiedPillText}>Verified</Text>
                    <Check size={11} color="#2E7D32" strokeWidth={2.5} style={{ marginLeft: 3 }} />
                  </View>
                ) : (
                  <View style={styles.pendingPill}>
                    <Text style={styles.pendingPillText}>Pending</Text>
                  </View>
                )}
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.stepDivider} />

            {/* Step 3: Photo Verification */}
            <TouchableOpacity
              style={styles.stepRow}
              onPress={() => handleVerifyStep('photo')}
              activeOpacity={0.7}
            >
              <View style={styles.stepIconCircle}>
                <Camera size={17} color="#E05638" />
              </View>
              <View style={styles.stepTextCol}>
                <Text style={styles.stepTitle}>Photo Verification</Text>
                <Text style={styles.stepSubtitle}>Take a quick selfie to verify it's you.</Text>
              </View>
              <View style={styles.badgeWithChevron}>
                {photoVerified ? (
                  <View style={styles.verifiedPill}>
                    <Text style={styles.verifiedPillText}>Verified</Text>
                    <Check size={11} color="#2E7D32" strokeWidth={2.5} style={{ marginLeft: 3 }} />
                  </View>
                ) : (
                  <View style={styles.pendingPill}>
                    <Text style={styles.pendingPillText}>Pending</Text>
                  </View>
                )}
                <ChevronRight size={16} color="#A0A0A0" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Privacy Callout Banner */}
          <View style={styles.calloutCard}>
            <View style={styles.shieldIconBox}>
              <Shield size={18} color="#E05638" fill="#FFF0E6" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>Your privacy is our priority</Text>
              <Text style={styles.calloutSubtitle}>
                Your documents and data are 100% secure and never shared with others.
              </Text>
            </View>
            <View style={styles.bellBadgeCircle}>
              <ShieldCheck size={14} color="#E05638" />
            </View>
          </View>

          {/* Section: Benefits of verification */}
          <Text style={styles.sectionTitle}>Benefits of verification</Text>

          <View style={styles.benefitsRow}>
            {/* Benefit 1 */}
            <View style={styles.benefitPillCard}>
              <Eye size={14} color="#E05638" style={{ marginRight: 4 }} />
              <Text style={styles.benefitText}>2x more</Text>
              <Text style={styles.benefitSubtext}>profile views</Text>
            </View>

            {/* Benefit 2 */}
            <View style={styles.benefitPillCard}>
              <Heart size={14} color="#E05638" style={{ marginRight: 4 }} />
              <Text style={styles.benefitText}>3x more</Text>
              <Text style={styles.benefitSubtext}>profile views</Text>
            </View>

            {/* Benefit 3 */}
            <View style={styles.benefitPillCard}>
              <Sparkles size={14} color="#E05638" style={{ marginRight: 4 }} />
              <Text style={styles.benefitText}>2x more</Text>
              <Text style={styles.benefitSubtext}>profile views</Text>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={handleStartFullVerification}
            activeOpacity={0.88}
          >
            <View style={styles.verifyBtnContent}>
              <ShieldCheck size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.verifyBtnText}>Verify my identity</Text>
            </View>
          </TouchableOpacity>

          {/* Subtext below button */}
          <View style={styles.secureFooterRow}>
            <Lock size={12} color="#8E8A85" style={{ marginRight: 4 }} />
            <Text style={styles.secureFooterText}>Secure & Encrypted</Text>
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
  helpButton: {
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
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle1: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: '#1E1E1E',
  },
  heroTitle2: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: '#E05638',
    marginTop: 1,
  },
  heroSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 6,
    lineHeight: 15,
  },
  heroShieldImage: {
    width: 90,
    height: 90,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  stepsCard: {
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
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  stepIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  stepTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  stepSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  badgeWithChevron: {
    flexDirection: 'row',
    alignItems: 'center',
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
  verifiedPillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#2E7D32',
  },
  pendingPill: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD6C2',
  },
  pendingPillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#E05638',
  },
  stepDivider: {
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
    paddingRight: 6,
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
  bellBadgeCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFD6C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20,
  },
  benefitPillCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  benefitText: {
    fontFamily: fontFamilies.bold,
    fontSize: 11.5,
    color: '#E05638',
    marginTop: 2,
  },
  benefitSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 9.5,
    color: '#777777',
    marginTop: 1,
  },
  verifyBtn: {
    backgroundColor: '#FA6400',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FA6400',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 8,
  },
  verifyBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  secureFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secureFooterText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#8E8A85',
  },
});
