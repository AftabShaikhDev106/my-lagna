import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { useTheme } from '../../../hooks/useTheme';
import { logoAsset, welcomeFortAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';
import { ShieldCheck, Heart, Users } from 'lucide-react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const logoWidth = Math.min(width * 0.52, 210);
  const logoHeight = logoWidth * 0.75;
  const curveHeight = 44;

  // Smooth natural wave SVG path string
  const svgPath = `M0,${curveHeight} Q${width * 0.5},${-curveHeight * 0.5} ${width},${curveHeight} L${width},${curveHeight + 2} L0,${curveHeight + 2} Z`;

  return (
    <ScreenContainer paddingHorizontal={0}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        {...({ backgroundColor: theme.colors.background } as any)}
      />

      {/* Top Header with Brand Logo & Tagline */}
      <View style={styles.header}>
        <Image
          source={logoAsset}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
          accessibilityLabel="My Lagna Logo"
        />
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
          FIND YOUR LIFE PARTNER
        </Text>
      </View>

      {/* Middle Section: Heritage Lake Palace Illustration */}
      <View style={styles.imageWrapper}>
        <Image
          source={welcomeFortAsset}
          style={styles.illustration}
          resizeMode="cover"
          accessibilityLabel="Heritage palace by lake shore"
        />
      </View>

      {/* Organic Curved Wave Transition */}
      <View style={styles.curveContainer}>
        <Svg
          width={width}
          height={curveHeight}
          viewBox={`0 0 ${width} ${curveHeight}`}
          style={styles.svgCurve}
        >
          <Path d={svgPath} fill="#E05638" />
        </Svg>
      </View>

      {/* Bottom Golden-Orange Card Container */}
      <View style={styles.bottomCard}>
        {/* 3 Feature Items Row */}
        <View style={styles.featuresRow}>
          {/* Feature 1: Verified Profiles */}
          <View style={styles.featureItem}>
            <ShieldCheck size={20} color="#FFFFFF" style={styles.featureIcon} />
            <Text style={styles.featureValue}>100%</Text>
            <Text style={styles.featureLabel}>Verified Profiles</Text>
          </View>

          {/* Feature 2: Meaningful Connections */}
          <View style={styles.featureItem}>
            <Heart size={20} color="#FFFFFF" style={styles.featureIcon} />
            <Text style={styles.featureValue}>Meaningful</Text>
            <Text style={styles.featureLabel}>Connections</Text>
          </View>

          {/* Feature 3: Made for Marathi Families */}
          <View style={styles.featureItem}>
            <Users size={20} color="#FFFFFF" style={styles.featureIcon} />
            <Text style={styles.featureValue}>Made for</Text>
            <Text style={styles.featureLabel}>Marathi Families</Text>
          </View>
        </View>

        {/* GET STARTED Primary Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', { mode: 'register' })}
          style={styles.getStartedButton}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>

        {/* Already have an account? Login Link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login', { mode: 'login' })}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  tagline: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 2.2,
    textAlign: 'center',
    marginTop: 6,
    textTransform: 'uppercase',
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  curveContainer: {
    width: '100%',
    height: 44,
    marginTop: -44,
    zIndex: 2,
  },
  svgCurve: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    backgroundColor: '#E05638',
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 24,
    alignItems: 'center',
    zIndex: 1,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    marginBottom: 6,
  },
  featureValue: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  featureLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 2,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  getStartedText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    letterSpacing: 1.2,
    color: '#E05638',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  loginPrompt: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loginLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
