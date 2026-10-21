import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';
import { Users, Star, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { couple1Asset, couple2Asset, couple3Asset } from '../../../assets';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

interface SlideData {
  id: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  subtitle: string;
  image: any;
}

const slides: SlideData[] = [
  {
    id: 'slide1',
    icon: Users,
    title: 'Find genuine\nmarathi matches',
    subtitle: 'Discover verified profiles with\nauthentic details and real intentions.',
    image: couple1Asset,
  },
  {
    id: 'slide2',
    icon: Star,
    title: 'Smart matching\njust for you',
    subtitle: 'We understand your preference\nand connect you with the right people.',
    image: couple2Asset,
  },
  {
    id: 'slide3',
    icon: ShieldCheck,
    title: 'Smart secure, &\nprivate experience',
    subtitle: 'Your safety and privacy are our\ntop priority. Always.',
    image: couple3Asset,
  },
];

export const OnboardingSliderScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideSize);
    if (index >= 0 && index < slides.length) {
      setActiveIndex(index);
    }
  };

  const goToNextSlide = () => {
    if (activeIndex < slides.length - 1) {
      const nextIndex = activeIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  const handleDotPress = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" {...({ backgroundColor: '#16100C' } as any)} />

      {/* Swipeable Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((item) => {
          const IconComponent = item.icon;
          return (
            <View key={item.id} style={[styles.slide, { width, height }]}>
              {/* Couple Background Photo */}
              <Image
                source={item.image}
                style={styles.bgImage}
                resizeMode="cover"
              />

              {/* Dark Gradient Overlay for High Text Contrast */}
              <View style={styles.darkOverlay} />

              {/* Slide Content Card */}
              <View style={styles.contentContainer}>
                {/* Circular Orange Badge Icon */}
                <View style={styles.iconBadge}>
                  <IconComponent size={24} color="#FFFFFF" />
                </View>

                {/* Main Heading */}
                <Text style={styles.titleText}>{item.title}</Text>

                {/* Subtitle */}
                <Text style={styles.subtitleText}>{item.subtitle}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Navigation Control Bar */}
      <View style={styles.bottomBar}>
        {/* Left: SKIP Button */}
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        {/* Center: Pagination Dots */}
        <View style={styles.paginationDots}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={`dot-${i}`}
              onPress={() => handleDotPress(i)}
              activeOpacity={0.7}
              style={[
                styles.dot,
                i === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Right: Circular Orange Next Arrow Button */}
        <TouchableOpacity
          onPress={goToNextSlide}
          style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.8}
        >
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16100C',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bgImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 10, 8, 0.48)',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E05638',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  titleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    lineHeight: 34,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitleText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 36,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  skipText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 1,
  },
  paginationDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotInactive: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'transparent',
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
