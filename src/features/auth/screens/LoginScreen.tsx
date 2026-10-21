import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Lock, Shield } from 'lucide-react-native';
import { AuthStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AuthHeader } from '../../../components/common/AuthHeader';
import { PhoneInput } from '../../../components/inputs/PhoneInput';
import { AppButton } from '../../../components/buttons/AppButton';
import { GoogleIcon } from '../../../components/common/GoogleIcon';
import { logoAsset, loginFortAsset } from '../../../assets';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();

  // Mode state: 'login' | 'register'
  const initialMode = route.params?.mode || 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const [mobile, setMobile] = useState(route.params?.phoneNumber || '');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleContinue = () => {
    setError('');
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formattedNumber = `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
    navigation.navigate('Otp', { phoneNumber: formattedNumber });
  };

  const handleGoogleAuth = () => {
    navigation.navigate('Otp', { phoneNumber: '+91 98765 43210' });
  };

  // Background color for gradient blend stops
  const bg = theme.colors.background;

  return (
    <ScreenContainer paddingHorizontal={0}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {isLogin ? (
            /* Mode 1: LOGIN MODE with Prominent Logo & Blended Fort Overlay */
            <View style={styles.loginHeaderWrapper}>
              {/* Back Button & Prominent Heart Logo */}
              <View style={styles.topHeaderRow}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                  accessibilityRole="button"
                  accessibilityLabel="Go Back"
                  activeOpacity={0.7}
                >
                  <ArrowLeft size={22} color={theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.logoCenter}>
                  <Image
                    source={logoAsset}
                    style={styles.heartLogoImage}
                    resizeMode="contain"
                    accessibilityLabel="My Lagna Logo"
                  />
                </View>

                <View style={styles.headerRightPlaceholder} />
              </View>

              {/* Blended Fort Banner Overlay Container */}
              <View style={styles.fortBannerContainer}>
                {/* Background Fort Image */}
                <Image
                  source={loginFortAsset}
                  style={styles.fortImageBg}
                  resizeMode="cover"
                />

                {/* Top Blend Gradient */}
                <LinearGradient
                  colors={[bg, 'rgba(255,248,244,0.35)', 'transparent']}
                  style={styles.topGradient}
                />

                {/* Bottom Blend Gradient */}
                <LinearGradient
                  colors={['transparent', 'rgba(255,248,244,0.65)', bg]}
                  style={styles.bottomGradient}
                />

                {/* Overlaid Content: Only Welcome Back Heading & Supporting Subtitle */}
                <View style={styles.bannerOverlaidContent}>
                  <Text
                    style={[styles.welcomeTitle, { color: theme.colors.text }]}
                  >
                    Welcome Back!
                  </Text>
                  <Text
                    style={[
                      styles.welcomeSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Glad to see you again.{'\n'}Please login to continue.
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            /* Mode 2: REGISTER MODE ("Create Your Account") Header */
            <View>
              <AuthHeader onBackPress={() => navigation.goBack()} />
              <View style={styles.registerHeaderSection}>
                <Text style={[styles.registerTitle, { color: theme.colors.text }]}>
                  Create Your Account
                </Text>
                <Text
                  style={[
                    styles.registerSubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Create a new account to start your journey with us.
                </Text>
              </View>
            </View>
          )}

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Phone Number Input */}
            <PhoneInput
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                if (error) setError('');
              }}
              error={error}
            />

            {/* Info note under phone input for Register mode */}
            {!isLogin ? (
              <View style={styles.infoNoteRow}>
                <Shield
                  size={16}
                  color={theme.colors.textSecondary}
                  style={styles.infoNoteIcon}
                />
                <Text
                  style={[
                    styles.infoNoteText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  We will send you a one-time OTP for verification.
                </Text>
              </View>
            ) : null}

            {/* Primary CONTINUE Button */}
            <AppButton
              title="CONTINUE"
              onPress={handleContinue}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}
            />

            {/* Divider OR */}
            <View style={styles.dividerRow}>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: theme.colors.border },
                ]}
              />
              <Text
                style={[
                  styles.dividerText,
                  { color: theme.colors.textMuted },
                ]}
              >
                OR
              </Text>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: theme.colors.border },
                ]}
              />
            </View>

            {/* Continue with Google Button */}
            <AppButton
              title="Continue with Google"
              variant="outline"
              icon={<GoogleIcon size={20} />}
              onPress={handleGoogleAuth}
              style={[
                styles.googleButton,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                },
              ]}
              textStyle={[styles.googleButtonText, { color: theme.colors.text }]}
            />

            {/* Security Guarantee Note (Login Mode) */}
            {isLogin ? (
              <View style={styles.securityNoteRow}>
                <Lock
                  size={16}
                  color={theme.colors.textSecondary}
                  style={styles.securityIcon}
                />
                <Text
                  style={[
                    styles.securityText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Your number is safe with us and will never be shared
                </Text>
              </View>
            ) : null}

            {/* Switch Mode Link (Login <-> Register) */}
            <View style={styles.switchModeRow}>
              <Text
                style={[
                  styles.switchModePrompt,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setError('');
                  setMode(isLogin ? 'register' : 'login');
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.switchModeLink,
                    { color: theme.colors.primary },
                  ]}
                >
                  {isLogin ? 'Create Account' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms & Privacy Disclaimer */}
            <View style={styles.disclaimerContainer}>
              <Text
                style={[
                  styles.disclaimerText,
                  { color: theme.colors.textMuted },
                ]}
              >
                By continuing, you agree to our{'\n'}
                <Text
                  style={[
                    styles.disclaimerLink,
                    { color: theme.colors.primary },
                  ]}
                >
                  Terms & Conditions
                </Text>{' '}
                and{' '}
                <Text
                  style={[
                    styles.disclaimerLink,
                    { color: theme.colors.primary },
                  ]}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  loginHeaderWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  topHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  logoCenter: {
    alignItems: 'center',
  },
  heartLogoImage: {
    width: 200,
    height: 150,
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36,
  },
  fortBannerContainer: {
    width: '100%',
    height: 180,
    marginTop: -20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fortImageBg: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  bannerOverlaidContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  welcomeTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  registerHeaderSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  registerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 6,
  },
  registerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  infoNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    marginBottom: 16,
  },
  infoNoteIcon: {
    marginRight: 6,
  },
  infoNoteText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  continueButton: {
    marginTop: 4,
    marginBottom: 20,
    borderRadius: 12,
    height: 52,
  },
  continueButtonText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    paddingHorizontal: 16,
    letterSpacing: 1,
  },
  googleButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  googleButtonText: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    marginLeft: 10,
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityIcon: {
    marginRight: 6,
  },
  securityText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  switchModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchModePrompt: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
  },
  switchModeLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  disclaimerContainer: {
    alignItems: 'center',
  },
  disclaimerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  disclaimerLink: {
    fontFamily: fontFamilies.semiBold,
  },
});
