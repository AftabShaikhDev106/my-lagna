import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { homeBottomPosterAsset } from '../../../assets';

export const HomeBottomPoster: React.FC = () => {
  const { width } = useWindowDimensions();

  // Fallback to 360 if width is 0 during initial layout
  const posterWidth = width > 0 ? width : 360;
  // Aspect ratio ~0.72 (between 16:9 video 0.56 and 1:1 square 1.0)
  const posterHeight = posterWidth * 0.72;

  return (
    <View style={[styles.container, { minHeight: posterHeight }]}>
      <TouchableOpacity
        activeOpacity={0.95}
        style={[styles.posterWrapper, { width: posterWidth, height: posterHeight }]}
      >
        <Image
          source={homeBottomPosterAsset}
          style={styles.posterImage}
          resizeMode="cover"
          accessibilityLabel="Home bottom promotional poster"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 12,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
});
