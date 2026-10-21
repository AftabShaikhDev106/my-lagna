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
  Shield,
  ShieldCheck,
  Bell,
  Heart,
  Filter,
  MessageSquare,
  Award,
  Headphones,
  Crown,
  ArrowRight,
  Check,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { premiumCrownAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'Premium'>;

interface PremiumFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'viewers',
    title: 'See who viewed you',
    subtitle: "Know who's interested in you.",
    icon: Bell,
  },
  {
    id: 'interests',
    title: 'Send Unlimited Interests',
    subtitle: 'Connect with as many profiles as you like.',
    icon: Heart,
  },
  {
    id: 'filters',
    title: 'Advanced Filters',
    subtitle: 'Find matches that truly match your preferences.',
    icon: Filter,
  },
  {
    id: 'chats',
    title: 'Unlimited Chats',
    subtitle: 'Chat freely without any limits.',
    icon: MessageSquare,
  },
  {
    id: 'badge',
    title: 'Premium Badge',
    subtitle: 'Stand out and get more attention.',
    icon: Award,
  },
  {
    id: 'support',
    title: 'Priority Support',
    subtitle: 'Get faster help whenever you need it.',
    icon: Headphones,
  },
];

type PlanId = '1month' | '3months' | '12months';

export const PremiumScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('3months');

  const handleUpgrade = () => {
    const planName =
      selectedPlan === '1month'
        ? '1 Month (₹299)'
        : selectedPlan === '3months'
        ? '3 Months (₹599)'
        : '12 Months (₹1,788)';

    Alert.alert(
      'Proceed to Payment',
      `You selected ${planName}. Would you like to proceed with secure checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: () => {
            Alert.alert(
              'Welcome to Premium! 👑',
              'Your subscription is active. Enjoy unlimited connections and chats!',
              [{ text: 'Continue', onPress: () => navigation.goBack() }]
            );
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
            <Text style={styles.headerTitle}>Premium</Text>
          </View>

          <View style={styles.secureBadgePill}>
            <Shield size={13} color="#E05638" />
            <Text style={styles.secureBadgeText}>Secure & Private</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Crown Card */}
          <View style={styles.heroSection}>
            <Image
              source={premiumCrownAsset}
              style={styles.heroCrownImage}
              resizeMode="contain"
            />
            <View style={styles.heroTextCol}>
              <Text style={styles.heroPreTitle}>Upgrade to</Text>
              <Text style={styles.heroBrandTitle}>My Lagna Premium</Text>
              <Text style={styles.heroSubtitle}>
                More connections. Better matches.{'\n'}Stronger possibilities.
              </Text>
            </View>
          </View>

          {/* Premium Features List Card */}
          <View style={styles.featuresCard}>
            {PREMIUM_FEATURES.map((feature, index) => {
              const IconComp = feature.icon;

              return (
                <React.Fragment key={feature.id}>
                  <TouchableOpacity
                    style={styles.featureRow}
                    activeOpacity={0.7}
                    onPress={() => {
                      Alert.alert(feature.title, feature.subtitle);
                    }}
                  >
                    <View style={styles.featureIconCircle}>
                      <IconComp size={18} color="#E05638" />
                    </View>
                    <View style={styles.featureInfoCol}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    </View>
                    <ChevronRight size={16} color="#A0A0A0" />
                  </TouchableOpacity>
                  {index < PREMIUM_FEATURES.length - 1 && (
                    <View style={styles.featureDivider} />
                  )}
                </React.Fragment>
              );
            })}
          </View>

          {/* Plans Section Header */}
          <View style={styles.plansHeaderRow}>
            <Text style={styles.plansSectionTitle}>Shortlisted Profiles</Text>
            <View style={styles.cancelAnytimeBadge}>
              <Shield size={12} color="#777777" />
              <Text style={styles.cancelAnytimeText}>Cancel anytime</Text>
            </View>
          </View>

          {/* 3 Subscription Plans Row */}
          <View style={styles.plansRow}>
            {/* Plan 1: 1 Month */}
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === '1month' ? styles.planCardSelected : null,
              ]}
              onPress={() => setSelectedPlan('1month')}
              activeOpacity={0.85}
            >
              <View style={styles.radioWrapper}>
                <View
                  style={[
                    styles.radioCircle,
                    selectedPlan === '1month' ? styles.radioCircleActive : null,
                  ]}
                >
                  {selectedPlan === '1month' && (
                    <Check size={10} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
              </View>

              <Text style={styles.planDurationText}>1 Month</Text>
              <Text style={styles.planPriceRateText}>₹299 / month</Text>

              <View style={styles.planSeparator} />

              <Text style={styles.planTotalText}>₹299</Text>
              <Text style={styles.planBilledFreqText}>Billed every month</Text>
            </TouchableOpacity>

            {/* Plan 2: 3 Months (Best Value) */}
            <TouchableOpacity
              style={[
                styles.planCard,
                styles.bestValueCard,
                selectedPlan === '3months' ? styles.planCardSelected : null,
              ]}
              onPress={() => setSelectedPlan('3months')}
              activeOpacity={0.85}
            >
              <View style={styles.bestValuePill}>
                <Text style={styles.bestValuePillText}>BEST VALUE</Text>
              </View>

              <View style={styles.radioWrapper}>
                <View
                  style={[
                    styles.radioCircle,
                    selectedPlan === '3months' ? styles.radioCircleActive : null,
                  ]}
                >
                  {selectedPlan === '3months' && (
                    <Check size={10} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
              </View>

              <Text style={styles.planDurationText}>3 Months</Text>
              <Text style={styles.planPriceRateText}>₹199 / month</Text>

              <View style={styles.savingsPill}>
                <Text style={styles.savingsPillText}>Save 33%</Text>
              </View>

              <View style={styles.priceWithOldRow}>
                <Text style={styles.planTotalText}>₹599</Text>
                <Text style={styles.oldPriceStrikethrough}>₹899</Text>
              </View>
              <Text style={styles.planBilledFreqText}>Billed every 3 months</Text>
            </TouchableOpacity>

            {/* Plan 3: 12 Months */}
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === '12months' ? styles.planCardSelected : null,
              ]}
              onPress={() => setSelectedPlan('12months')}
              activeOpacity={0.85}
            >
              <View style={styles.radioWrapper}>
                <View
                  style={[
                    styles.radioCircle,
                    selectedPlan === '12months' ? styles.radioCircleActive : null,
                  ]}
                >
                  {selectedPlan === '12months' && (
                    <Check size={10} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
              </View>

              <Text style={styles.planDurationText}>12 Months</Text>
              <Text style={styles.planPriceRateText}>₹149 / month</Text>

              <View style={styles.savingsPill}>
                <Text style={styles.savingsPillText}>Save 50%</Text>
              </View>

              <View style={styles.priceWithOldRow}>
                <Text style={styles.planTotalText}>₹1,788</Text>
                <Text style={styles.oldPriceStrikethrough}>₹3,588</Text>
              </View>
              <Text style={styles.planBilledFreqText}>Billed every 12 months</Text>
            </TouchableOpacity>
          </View>

          {/* 100% Secure Payments Banner */}
          <View style={styles.securePaymentCard}>
            <View style={styles.securePaymentLeft}>
              <ShieldCheck size={22} color="#2E7D32" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.securePaymentTitle}>100% Secure Payments</Text>
                <Text style={styles.securePaymentSubtitle}>
                  Your payment information is safe with us.
                </Text>
              </View>
            </View>

            <View style={styles.paymentBadgesRow}>
              <View style={styles.payPill}>
                <Text style={styles.payPillText}>UPI</Text>
              </View>
              <View style={styles.payPill}>
                <Text style={styles.payPillText}>VISA</Text>
              </View>
              <View style={styles.payPill}>
                <Text style={styles.payPillText}>MC</Text>
              </View>
              <View style={styles.payPill}>
                <Text style={styles.payPillText}>RuPay</Text>
              </View>
            </View>
          </View>

          {/* Upgrade Now CTA Button */}
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={handleUpgrade}
            activeOpacity={0.88}
          >
            <View style={styles.upgradeBtnContent}>
              <Crown size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
              <ArrowRight size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          {/* Guarantee Subtext */}
          <Text style={styles.guaranteeText}>
            Secure Payment • Cancel anytime • No hidden charges
          </Text>
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
  secureBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBE0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFD6C2',
  },
  secureBadgeText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: '#E05638',
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  heroCrownImage: {
    width: 88,
    height: 88,
    marginRight: 14,
  },
  heroTextCol: {
    flex: 1,
  },
  heroPreTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    color: '#1E1E1E',
  },
  heroBrandTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: '#E05638',
    marginVertical: 2,
  },
  heroSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#666666',
    lineHeight: 16,
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
  featureIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureInfoCol: {
    flex: 1,
    paddingRight: 6,
  },
  featureTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  featureSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  featureDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  plansHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  plansSectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
  },
  cancelAnytimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelAnytimeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginLeft: 4,
  },
  plansRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  bestValueCard: {
    borderColor: '#E05638',
    backgroundColor: '#FFFFFF',
  },
  planCardSelected: {
    borderColor: '#E05638',
    backgroundColor: '#FFFDFB',
    shadowColor: '#E05638',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  bestValuePill: {
    position: 'absolute',
    top: -9,
    right: 8,
    backgroundColor: '#FA6400',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 10,
  },
  bestValuePillText: {
    fontFamily: fontFamilies.bold,
    fontSize: 8,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  radioWrapper: {
    marginBottom: 6,
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C4B7AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#E05638',
    backgroundColor: '#E05638',
  },
  planDurationText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 3,
  },
  planPriceRateText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 10.5,
    color: '#E05638',
    marginBottom: 4,
  },
  savingsPill: {
    backgroundColor: '#FFEFE6',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginVertical: 4,
  },
  savingsPillText: {
    fontFamily: fontFamilies.bold,
    fontSize: 8.5,
    color: '#E05638',
  },
  planSeparator: {
    height: 1,
    width: '80%',
    backgroundColor: '#F3E9E2',
    marginVertical: 6,
  },
  priceWithOldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  planTotalText: {
    fontFamily: fontFamilies.bold,
    fontSize: 11,
    color: '#1E1E1E',
  },
  oldPriceStrikethrough: {
    fontFamily: fontFamilies.regular,
    fontSize: 9,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  planBilledFreqText: {
    fontFamily: fontFamilies.regular,
    fontSize: 8.5,
    color: '#8E8A85',
    textAlign: 'center',
    marginTop: 2,
  },
  securePaymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  securePaymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  securePaymentTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 11.5,
    color: '#1E1E1E',
  },
  securePaymentSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 9.5,
    color: '#777777',
    marginTop: 1,
  },
  paymentBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  payPill: {
    backgroundColor: '#F8F4F0',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E4D8D0',
  },
  payPillText: {
    fontFamily: fontFamilies.bold,
    fontSize: 8,
    color: '#555555',
  },
  upgradeBtn: {
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
  upgradeBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  guaranteeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#8E8A85',
    textAlign: 'center',
    marginBottom: 12,
  },
});
