import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {
  Heart,
  X,
  Star,
  MoreVertical,
  Briefcase,
  MapPin,
  Building2,
  Ruler,
  CheckCircle2,
} from 'lucide-react-native';
import { DiscoverProfile } from '../data/discoverProfilesData';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

interface SwipeableProfileCardProps {
  profile: DiscoverProfile;
  isTopCard: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeDown: () => void;
  onPressProfile?: () => void;
}

export const SwipeableProfileCard: React.FC<SwipeableProfileCardProps> = ({
  profile,
  isTopCard,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  onPressProfile,
}) => {
  const theme = useTheme();

  // Active photo index in photo gallery
  const [photoIndex, setPhotoIndex] = useState(0);

  // Animated ValueXY for tracking touch drag
  const position = useRef(new Animated.ValueXY()).current;

  // Gesture responder for top card
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTopCard,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        isTopCard && (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5),
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;

        // Check vertical downward swipe gesture first if vertical movement dominates
        if (dy > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
          Animated.timing(position, {
            toValue: { x: 0, y: 600 },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            onSwipeDown();
            position.setValue({ x: 0, y: 0 });
          });
        }
        // Swipe Right (Send Interest)
        else if (dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight();
            position.setValue({ x: 0, y: 0 });
          });
        }
        // Swipe Left (Pass)
        else if (dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft();
            position.setValue({ x: 0, y: 0 });
          });
        }
        // Reset position
        else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  // Programmatic Button Triggers
  const handlePassPress = () => {
    if (!isTopCard) return;
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 280,
      useNativeDriver: false,
    }).start(() => {
      onSwipeLeft();
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleInterestPress = () => {
    if (!isTopCard) return;
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 280,
      useNativeDriver: false,
    }).start(() => {
      onSwipeRight();
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleShortlistPress = () => {
    if (!isTopCard) return;
    Animated.timing(position, {
      toValue: { x: 0, y: 600 },
      duration: 280,
      useNativeDriver: false,
    }).start(() => {
      onSwipeDown();
      position.setValue({ x: 0, y: 0 });
    });
  };

  // Rotation interpolations
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  // Stamp Badge Opacities
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD / 2, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const wishlistOpacity = position.y.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = isTopCard
    ? {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate },
        ],
      }
    : {};

  const currentPhoto = profile.photos[photoIndex] || profile.photos[0];

  return (
    <Animated.View
      {...(isTopCard ? panResponder.panHandlers : {})}
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.surface },
        animatedCardStyle,
      ]}
    >
      {/* Dynamic Overlay Stamp Badges */}
      {isTopCard ? (
        <>
          {/* LIKE / INTEREST STAMP */}
          <Animated.View
            style={[styles.stampContainer, styles.likeStamp, { opacity: likeOpacity }]}
          >
            <Text style={styles.likeStampText}>SEND INTEREST</Text>
          </Animated.View>

          {/* PASS STAMP */}
          <Animated.View
            style={[styles.stampContainer, styles.passStamp, { opacity: passOpacity }]}
          >
            <Text style={styles.passStampText}>PASS</Text>
          </Animated.View>

          {/* WISHLIST STAMP */}
          <Animated.View
            style={[styles.stampContainer, styles.wishlistStamp, { opacity: wishlistOpacity }]}
          >
            <Text style={styles.wishlistStampText}>⭐ WISHLIST</Text>
          </Animated.View>
        </>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPressProfile}
        style={{ flex: 1 }}
      >
        {/* Top Image Section */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: currentPhoto }}
            style={styles.profileImage}
            resizeMode="cover"
          />

          {/* Top Left Compatibility Badge */}
          <View style={styles.compatBadge}>
            <View style={styles.compatBadgeRow}>
              <Heart size={14} color="#E05638" fill="#E05638" style={{ marginRight: 4 }} />
              <Text style={styles.compatScoreText}>{profile.matchScore}%</Text>
            </View>
            <Text style={styles.compatLabelText}>Compatible</Text>
          </View>

          {/* Top Right Counter Badge */}
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {photoIndex + 1}/{profile.photos.length}
            </Text>
            <MoreVertical size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </View>

          {/* Bottom Pagination Dots */}
          <View style={styles.dotsRow}>
            {profile.photos.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setPhotoIndex(i)}
                style={[
                  styles.dot,
                  i === photoIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content Details Section */}
        <View style={styles.contentSection}>
          {/* Name & Age Row */}
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, { color: theme.colors.text }]}>
              {profile.name}, {profile.age}
            </Text>
            {profile.isVerified ? (
              <View style={styles.verifiedBadgeCircle}>
                <CheckCircle2 size={20} color="#E05638" fill="#FFF4EE" />
              </View>
            ) : null}
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Briefcase size={16} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {profile.profession}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <MapPin size={16} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {profile.location}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Building2 size={16} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {profile.community}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Ruler size={16} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {profile.heightReligion}
              </Text>
            </View>
          </View>

          {/* Horizontal Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          {/* Interest Tags */}
          <View style={styles.tagsRow}>
            {profile.tags.map((tag, idx) => (
              <View
                key={idx}
                style={[
                  styles.tagPill,
                  { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.borderLight },
                ]}
              >
                <Text style={[styles.tagText, { color: theme.colors.text }]}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* About Her Section */}
          <View style={styles.aboutSection}>
            <Text style={[styles.aboutHeading, { color: theme.colors.text }]}>About her</Text>
            <Text style={[styles.aboutBody, { color: theme.colors.textSecondary }]}>
              {profile.about}
            </Text>
          </View>

          {/* Partner Preference Highlight Banner */}
          <View style={[styles.preferenceBanner, { backgroundColor: theme.colors.badgeBackground }]}>
            <Star size={16} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.prefText, { color: theme.colors.textSecondary }]}>
              Prefers partner from{' '}
              <Text style={[styles.prefHighlight, { color: theme.colors.primary }]}>
                {profile.preferenceHighlight.replace('Prefers partner from ', '')}
              </Text>
            </Text>
          </View>

          {/* Gesture Helper Prompt */}
          <Text style={[styles.swipePromptText, { color: theme.colors.textMuted }]}>
            Swipe to explore more profiles
          </Text>

          {/* 3 Action Buttons */}
          <View style={styles.actionsRow}>
            {/* Pass Button (Left) */}
            <TouchableOpacity
              onPress={handlePassPress}
              activeOpacity={0.8}
              style={styles.actionBtnWrapper}
            >
              <View style={[styles.passBtnCircle, { backgroundColor: theme.colors.surface }]}>
                <X size={24} color="#EF5350" />
              </View>
              <Text style={styles.passBtnLabel}>Pass</Text>
            </TouchableOpacity>

            {/* Send Interest Button (Center - Primary & Larger) */}
            <TouchableOpacity
              onPress={handleInterestPress}
              activeOpacity={0.85}
              style={styles.actionBtnWrapper}
            >
              <View style={[styles.interestBtnCircle, { backgroundColor: theme.colors.primary }]}>
                <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
              </View>
              <Text style={[styles.interestBtnLabel, { color: theme.colors.primary }]}>
                Send Interest
              </Text>
            </TouchableOpacity>

            {/* Shortlist Button (Right) */}
            <TouchableOpacity
              onPress={handleShortlistPress}
              activeOpacity={0.8}
              style={styles.actionBtnWrapper}
            >
              <View style={[styles.shortlistBtnCircle, { backgroundColor: theme.colors.surface }]}>
                <Star size={24} color="#F57C00" fill="#FFF3E0" />
              </View>
              <Text style={styles.shortlistBtnLabel}>Shortlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 20,
    position: 'relative',
  },
  stampContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 3,
  },
  likeStamp: {
    left: 40,
    borderColor: '#E05638',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ rotate: '-15deg' }],
  },
  likeStampText: {
    color: '#E05638',
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    letterSpacing: 1.5,
  },
  passStamp: {
    right: 40,
    borderColor: '#EF5350',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ rotate: '15deg' }],
  },
  passStampText: {
    color: '#EF5350',
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    letterSpacing: 1.5,
  },
  wishlistStamp: {
    top: 100,
    alignSelf: 'center',
    borderColor: '#F57C00',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  wishlistStampText: {
    color: '#F57C00',
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    letterSpacing: 1.5,
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    position: 'relative',
    backgroundColor: '#EFE6E1',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  compatBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compatBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatScoreText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#E05638',
  },
  compatLabelText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: '#E05638',
    marginTop: 1,
  },
  counterBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: '#FFFFFF',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: '#E05638',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  contentSection: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    lineHeight: 30,
    marginRight: 8,
  },
  verifiedBadgeCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 6,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  aboutSection: {
    marginBottom: 16,
  },
  aboutHeading: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    marginBottom: 4,
  },
  aboutBody: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 19,
  },
  preferenceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  prefText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    flex: 1,
  },
  prefHighlight: {
    fontFamily: fontFamilies.bold,
  },
  swipePromptText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  actionBtnWrapper: {
    alignItems: 'center',
  },
  passBtnCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#FFD6D6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF5350',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  passBtnLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#EF5350',
    marginTop: 6,
  },
  interestBtnCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  interestBtnLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    marginTop: 6,
  },
  shortlistBtnCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#FFE0B2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F57C00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  shortlistBtnLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#F57C00',
    marginTop: 6,
  },
});
