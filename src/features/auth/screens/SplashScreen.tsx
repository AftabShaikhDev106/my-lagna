import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../hooks/useTheme';
import { AppText } from '../../../components/common/AppText';
import { fontFamilies } from '../../../theme/typography';
import { logoAsset, splashFortAsset } from '../../../assets';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [fadeAnim, navigation]);

  const logoWidth = Math.min(width * 0.58, 240);
  const logoHeight = logoWidth * 0.85;
  const illustrationHeight = Math.min(height * 0.36, 280);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        {...({ backgroundColor: theme.colors.background } as any)}
      />

      <View style={styles.centerContainer}>
        <Animated.View style={[styles.brandContainer, { opacity: fadeAnim }]}>
          <Image
            source={logoAsset}
            style={{ width: logoWidth, height: logoHeight }}
            resizeMode="contain"
            accessibilityLabel="My Lagna Logo"
          />

          <AppText
            style={[
              styles.tagline,
              {
                color: theme.colors.textSecondary,
                marginTop: theme.spacing.sm,
              },
            ]}
          >
            FIND YOUR LIFE PARTNER
          </AppText>
        </Animated.View>
      </View>

      <View style={[styles.illustrationContainer, { height: illustrationHeight }]}>
        <Image
          source={splashFortAsset}
          style={styles.illustrationImage}
          resizeMode="cover"
          accessibilityLabel="Heritage palace bottom decoration"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 2.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  illustrationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    overflow: 'hidden',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
});
