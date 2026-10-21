import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Shield, Smartphone } from 'lucide-react-native';
import { AuthStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AuthHeader } from '../../../components/common/AuthHeader';
import { AppButton } from '../../../components/buttons/AppButton';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export const OtpVerificationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  const phoneNumber = route.params?.phoneNumber || '+91 98765 43210';

  // 6-digit OTP state array
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Resend Timer (starts at 29s as in reference image 00:29)
  const [timer, setTimer] = useState<number>(29);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Array of 6 input refs
  const inputRefs = useRef<Array<React.ElementRef<typeof TextInput> | null>>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    setError('');
    const cleanText = text.replace(/[^0-9]/g, '');

    // Support pasting multi-digit code
    if (cleanText.length > 1) {
      const newOtp = [...otp];
      const digits = cleanText.slice(0, 6).split('');
      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    // Auto focus next input
    if (cleanText !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      setError('');
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setTimer(29);
    setCanResend(false);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    // Mock verification check: '000000' is configured as invalid OTP for testing error state
    if (fullOtp === '000000') {
      setError('Invalid verification code. Please try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ProfileSetup');
    }, 800);
  };

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
          {/* Brand Header */}
          <AuthHeader onBackPress={() => navigation.goBack()} />

          <View style={styles.body}>
            {/* Title & Subtitle */}
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Verify Your Number
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              We've sent a 6-digit verification code to your mobile number
            </Text>

            {/* Phone Number Pill Card */}
            <View
              style={[
                styles.phoneCard,
                { backgroundColor: theme.colors.badgeBackground },
              ]}
            >
              <View style={styles.phoneCardLeft}>
                <View style={styles.phoneIconWrapper}>
                  <Smartphone size={18} color={theme.colors.primary} />
                </View>
                <Text
                  style={[styles.phoneNumberText, { color: theme.colors.text }]}
                >
                  {phoneNumber}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Edit phone number"
              >
                <Text
                  style={[styles.editLink, { color: theme.colors.primary }]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* 6 Square OTP Inputs */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => {
                const isFocused = focusedIndex === index;
                const hasValue = digit.length > 0;
                const boxBorderColor = error
                  ? theme.colors.error
                  : isFocused || hasValue
                  ? theme.colors.primary
                  : theme.colors.border;

                return (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpBox,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: boxBorderColor,
                        color: theme.colors.text,
                      },
                    ]}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    accessibilityLabel={`OTP digit ${index + 1}`}
                  />
                );
              })}
            </View>

            {/* Error Message */}
            {error ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            ) : null}

            {/* Resend Code Section */}
            <View style={styles.resendRow}>
              <Text
                style={[
                  styles.resendPrompt,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Didn't receive the code?{' '}
              </Text>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text
                    style={[
                      styles.resendLink,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Resend code
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Resend code in{' '}
                  <Text
                    style={[
                      styles.timerHighlight,
                      { color: theme.colors.primary },
                    ]}
                  >
                    00:{timer < 10 ? `0${timer}` : timer}
                  </Text>
                </Text>
              )}
            </View>

            {/* CONTINUE Button */}
            <AppButton
              title="CONTINUE"
              onPress={handleVerify}
              loading={loading}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}
            />

            {/* Security Guarantee Note */}
            <View style={styles.securityNoteRow}>
              <Shield
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
  body: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  phoneCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 28,
  },
  phoneCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIconWrapper: {
    marginRight: 10,
  },
  phoneNumberText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
  },
  editLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  otpBox: {
    width: 46,
    height: 54,
    borderWidth: 1.5,
    borderRadius: 12,
    textAlign: 'center',
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  resendPrompt: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
  },
  resendLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  timerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#6C635F',
  },
  timerHighlight: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
  },
  continueButton: {
    marginTop: 12,
    marginBottom: 24,
    borderRadius: 12,
    height: 52,
  },
  continueButtonText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    letterSpacing: 1,
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  securityIcon: {
    marginRight: 8,
  },
  securityText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
