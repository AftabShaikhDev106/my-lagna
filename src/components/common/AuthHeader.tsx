import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { logoAsset } from '../../assets';

interface AuthHeaderProps {
  onBackPress?: () => void;
  showBack?: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  onBackPress,
  showBack = true,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Header Row with Back Button */}
      <View style={styles.topRow}>
        {showBack && onBackPress ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={theme.colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* Large Prominent Centered Heart Logo */}
        <View style={styles.logoCenter}>
          <Image
            source={logoAsset}
            style={styles.largeLogoImage}
            resizeMode="contain"
            accessibilityLabel="My Lagna Logo"
          />
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  backPlaceholder: {
    width: 36,
    height: 36,
    marginTop: 6,
  },
  logoCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeLogoImage: {
    width: 200,
    height: 150,
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36,
  },
});
